export interface OrderItem {
  id: string;
  drinkId: string;
  drinkName: string;
  price: number;
  mixer?: string;
  served: boolean;
  timestamp: number;
}

export interface Table {
  id: string;
  name: string;
  clientName?: string;
  package?: number;
  orders: OrderItem[];
  isClosed: boolean;
  history: ClosedTable[];
  order: number;
}

export interface ClosedTable {
  id: string;
  timestamp: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'both';
  cashAmount?: number;
  cardAmount?: number;
}

export interface BarState {
  tables: Table[];
  totalEncashed: number;
  cashEncashed: number;
  cardEncashed: number;
  lastNewSessionTime: number;
}
