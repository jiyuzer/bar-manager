import React, { useState } from 'react';
import { COLORS } from '../constants/colors';

interface CloseTableModalProps {
  isOpen: boolean;
  total: number;
  onClose: () => void;
  onConfirm: (method: string, cashAmount?: number) => void;
}

export const CloseTableModal: React.FC<CloseTableModalProps> = ({
  isOpen,
  total,
  onClose,
  onConfirm,
}) => {
  const [method, setMethod] = useState<'cash' | 'card' | 'both'>('cash');
  const [cashAmount, setCashAmount] = useState<string>(total.toFixed(2));

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(method, method === 'both' ? parseFloat(cashAmount) : undefined);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: COLORS.card,
          borderRadius: '16px',
          padding: '24px',
          maxWidth: '400px',
          width: '90%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ color: COLORS.text, margin: '0 0 20px 0' }}>Clôturer la table</h2>

        <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: COLORS.background, borderRadius: '8px' }}>
          <p style={{ color: COLORS.textSecondary, margin: '0 0 8px 0', fontSize: '14px' }}>Total à encaisser</p>
          <p style={{ color: COLORS.gold, margin: 0, fontSize: '24px', fontWeight: 'bold' }}>€{total.toFixed(2)}</p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ color: COLORS.text, display: 'block', marginBottom: '12px' }}>Mode de paiement</label>
          <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
            {['cash', 'card', 'both'].map((m) => (
              <label key={m} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="payment"
                  value={m}
                  checked={method === m}
                  onChange={(e) => setMethod(e.target.value as 'cash' | 'card' | 'both')}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ color: COLORS.text }}>
                  {m === 'cash' && 'Espèces'}
                  {m === 'card' && 'Carte'}
                  {m === 'both' && 'Les deux'}
                </span>
              </label>
            ))}
          </div>
        </div>

        {method === 'both' && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: COLORS.text, display: 'block', marginBottom: '8px' }}>Montant espèces</label>
            <input
              type="number"
              value={cashAmount}
              onChange={(e) => setCashAmount(e.target.value)}
              max={total}
              step="0.01"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                border: `1px solid ${COLORS.border}`,
                backgroundColor: COLORS.background,
                color: COLORS.text,
                fontSize: '16px',
                boxSizing: 'border-box',
              }}
            />
            <p style={{ color: COLORS.textSecondary, margin: '8px 0 0 0', fontSize: '12px' }}>
              Carte: €{(total - parseFloat(cashAmount)).toFixed(2)}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: COLORS.border,
              color: COLORS.text,
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            Annuler
          </button>
          <button
            onClick={handleConfirm}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: COLORS.success,
              color: COLORS.text,
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};
