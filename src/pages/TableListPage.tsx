import React, { useState } from 'react';
import { useBar } from '../context/BarContext';
import { TableCard } from '../components/TableCard';
import { COLORS } from '../constants/colors';
import { Table } from '../types';

const TableListPage: React.FC = () => {
  const { tables, totalEncashed, cashEncashed, cardEncashed, newSession, reorderTables } = useBar();
  const [draggedTable, setDraggedTable] = useState<Table | null>(null);

  const handleDragStart = (e: React.DragEvent, table: Table) => {
    setDraggedTable(table);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetTable: Table) => {
    e.preventDefault();
    if (!draggedTable || draggedTable.id === targetTable.id) return;

    const draggedIndex = tables.findIndex((t) => t.id === draggedTable.id);
    const targetIndex = tables.findIndex((t) => t.id === targetTable.id);

    const newTables = [...tables];
    [newTables[draggedIndex], newTables[targetIndex]] = [newTables[targetIndex], newTables[draggedIndex]];
    reorderTables(newTables);
    setDraggedTable(null);
  };

  const handleNewSession = () => {
    if (window.confirm('Êtes-vous sûr de vouloir démarrer une nouvelle soirée ? Cela réinitialisera toutes les données.')) {
      newSession();
    }
  };

  const sortedTables = [...tables].sort((a, b) => a.order - b.order);

  return (
    <div
      style={{
        backgroundColor: COLORS.background,
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ color: COLORS.gold, margin: 0, fontSize: '28px' }}>Bar Manager</h1>
        <button
          onClick={handleNewSession}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: COLORS.error,
            color: COLORS.text,
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          Nouvelle soirée
        </button>
      </div>

      {/* Encashed card */}
      {totalEncashed > 0 && (
        <div
          style={{
            backgroundColor: COLORS.card,
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
            border: `1px solid ${COLORS.gold}`,
          }}
        >
          <h3 style={{ color: COLORS.gold, margin: '0 0 12px 0', fontSize: '16px' }}>Encaissé ce soir</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            <div>
              <p style={{ color: COLORS.textSecondary, margin: '0', fontSize: '12px' }}>Total</p>
              <p style={{ color: COLORS.text, margin: '4px 0 0 0', fontSize: '20px', fontWeight: 'bold' }}>
                €{totalEncashed.toFixed(2)}
              </p>
            </div>
            <div>
              <p style={{ color: COLORS.textSecondary, margin: '0', fontSize: '12px' }}>Espèces</p>
              <p style={{ color: COLORS.text, margin: '4px 0 0 0', fontSize: '20px', fontWeight: 'bold' }}>
                €{cashEncashed.toFixed(2)}
              </p>
            </div>
            <div>
              <p style={{ color: COLORS.textSecondary, margin: '0', fontSize: '12px' }}>Carte</p>
              <p style={{ color: COLORS.text, margin: '4px 0 0 0', fontSize: '20px', fontWeight: 'bold' }}>
                €{cardEncashed.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tables grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
        {sortedTables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            draggable={true}
            onDragStart={(e) => handleDragStart(e, table)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, table)}
          />
        ))}
      </div>
    </div>
  );
};

export default TableListPage;
