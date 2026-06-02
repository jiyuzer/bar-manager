import React, { createContext, useContext, useState, useEffect } from 'react';
import { Table, OrderItem, BarState, ClosedTable } from '../types';
import { TABLE_NAMES } from '../constants/tables';

const STORAGE_KEY = '@bar_manager_tables_v3';

interface BarContextType {
  tables: Table[];
  totalEncashed: number;
  cashEncashed: number;
  cardEncashed: number;
  addOrder: (tableId: string, item: OrderItem) => void;
  removeOrder: (tableId: string, orderId: string) => void;
  toggleServed: (tableId: string, orderId: string) => void;
  updateTable: (tableId: string, updates: Partial<Table>) => void;
  closeTable: (tableId: string, total: number, paymentMethod: string, cashAmount?: number) => void;
  newSession: () => void;
  reorderTables: (newOrder: Table[]) => void;
  isLoading: boolean;
}

const BarContext = createContext<BarContextType | undefined>(undefined);

const initializeDefaultTables = (): Table[] => {
  return TABLE_NAMES.map((name, index) => ({
    id: `table_${index}`,
    name,
    orders: [],
    isClosed: false,
    history: [],
    order: index,
  }));
};

export const BarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [barState, setBarState] = useState<BarState>({
    tables: initializeDefaultTables(),
    totalEncashed: 0,
    cashEncashed: 0,
    cardEncashed: 0,
    lastNewSessionTime: Date.now(),
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setBarState(parsed);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(barState));
    }
  }, [barState, isLoading]);

  const addOrder = (tableId: string, item: OrderItem) => {
    setBarState((prev) => ({
      ...prev,
      tables: prev.tables.map((table) =>
        table.id === tableId
          ? { ...table, orders: [...table.orders, item] }
          : table
      ),
    }));
  };

  const removeOrder = (tableId: string, orderId: string) => {
    setBarState((prev) => ({
      ...prev,
      tables: prev.tables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              orders: table.orders.filter((order) => order.id !== orderId),
            }
          : table
      ),
    }));
  };

  const toggleServed = (tableId: string, orderId: string) => {
    setBarState((prev) => ({
      ...prev,
      tables: prev.tables.map((table) =>
        table.id === tableId
          ? {
              ...table,
              orders: table.orders.map((order) =>
                order.id === orderId ? { ...order, served: !order.served } : order
              ),
            }
          : table
      ),
    }));
  };

  const updateTable = (tableId: string, updates: Partial<Table>) => {
    setBarState((prev) => ({
      ...prev,
      tables: prev.tables.map((table) =>
        table.id === tableId ? { ...table, ...updates } : table
      ),
    }));
  };

  const closeTable = (
    tableId: string,
    total: number,
    paymentMethod: string,
    cashAmount?: number
  ) => {
    setBarState((prev) => {
      const closedEntry: ClosedTable = {
        id: `close_${Date.now()}`,
        timestamp: Date.now(),
        total,
        paymentMethod: paymentMethod as 'cash' | 'card' | 'both',
        cashAmount: paymentMethod === 'cash' || paymentMethod === 'both' ? cashAmount || total : 0,
        cardAmount:
          paymentMethod === 'card'
            ? total
            : paymentMethod === 'both'
            ? total - (cashAmount || 0)
            : 0,
      };

      return {
        ...prev,
        tables: prev.tables.map((table) =>
          table.id === tableId
            ? {
                ...table,
                isClosed: false,
                orders: [],
                history: [...table.history, closedEntry],
              }
            : table
        ),
        totalEncashed: prev.totalEncashed + total,
        cashEncashed:
          prev.cashEncashed + (closedEntry.cashAmount || 0),
        cardEncashed:
          prev.cardEncashed + (closedEntry.cardAmount || 0),
      };
    });
  };

  const newSession = () => {
    setBarState({
      tables: initializeDefaultTables(),
      totalEncashed: 0,
      cashEncashed: 0,
      cardEncashed: 0,
      lastNewSessionTime: Date.now(),
    });
  };

  const reorderTables = (newOrder: Table[]) => {
    const reorderedTables = newOrder.map((table, index) => ({
      ...table,
      order: index,
    }));
    setBarState((prev) => ({
      ...prev,
      tables: reorderedTables,
    }));
  };

  return (
    <BarContext.Provider
      value={{
        tables: barState.tables,
        totalEncashed: barState.totalEncashed,
        cashEncashed: barState.cashEncashed,
        cardEncashed: barState.cardEncashed,
        addOrder,
        removeOrder,
        toggleServed,
        updateTable,
        closeTable,
        newSession,
        reorderTables,
        isLoading,
      }}
    >
      {children}
    </BarContext.Provider>
  );
};

export const useBar = () => {
  const context = useContext(BarContext);
  if (context === undefined) {
    throw new Error('useBar must be used within a BarProvider');
  }
  return context;
};
