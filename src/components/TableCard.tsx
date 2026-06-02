import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from '../types';
import { COLORS } from '../constants/colors';

interface TableCardProps {
  table: Table;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
}

export const TableCard: React.FC<TableCardProps> = ({
  table,
  draggable = true,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const total = table.orders.reduce((sum, order) => sum + order.price, 0);
  const pendingCount = table.orders.filter((o) => !o.served).length;
  const servedCount = table.orders.filter((o) => o.served).length;

  let status = 'Vide';
  if (table.orders.length > 0 && pendingCount === 0) {
    status = 'Tout servi';
  } else if (pendingCount > 0) {
    status = `${pendingCount} en attente`;
  }

  return (
    <Link to={`/table/${table.id}`}>
      <div
        draggable={draggable}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        style={{
          backgroundColor: COLORS.card,
          borderRadius: '12px',
          padding: '16px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          border: `1px solid ${COLORS.border}`,
          minHeight: '140px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = COLORS.hover;
          (e.currentTarget as HTMLElement).style.borderColor = COLORS.gold;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = COLORS.card;
          (e.currentTarget as HTMLElement).style.borderColor = COLORS.border;
        }}
      >
        <div>
          <h3 style={{ color: COLORS.text, margin: '0 0 8px 0', fontSize: '18px' }}>
            {table.name}
          </h3>
          {table.clientName && (
            <p style={{ color: COLORS.textSecondary, margin: '0 0 4px 0', fontSize: '14px' }}>
              {table.clientName}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ color: COLORS.gold, margin: '8px 0 0 0', fontSize: '14px' }}>
              Total: €{total.toFixed(2)}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <span
              style={{
                backgroundColor: status === 'Vide' ? COLORS.border : COLORS.warning,
                color: COLORS.text,
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              {status}
            </span>
            {servedCount > 0 && (
              <span
                style={{
                  backgroundColor: COLORS.success,
                  color: COLORS.text,
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                }}
              >
                ✓ {servedCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
