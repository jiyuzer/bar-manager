import React from 'react';
import { COLORS } from '../constants/colors';
import { MIXERS } from '../constants/drinks';

interface MixerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMixer: (mixer: string) => void;
}

export const MixerModal: React.FC<MixerModalProps> = ({ isOpen, onClose, onSelectMixer }) => {
  if (!isOpen) return null;

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
        zIndex: 110,
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
        <h2 style={{ color: COLORS.text, margin: '0 0 20px 0', textAlign: 'center' }}>
          Quel mixer ?
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {MIXERS.map((mixer) => (
            <button
              key={mixer}
              onClick={() => onSelectMixer(mixer)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: COLORS.border,
                color: COLORS.text,
                cursor: 'pointer',
                textAlign: 'center',
                fontSize: '16px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = COLORS.gold;
                (e.currentTarget as HTMLElement).style.color = COLORS.background;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = COLORS.border;
                (e.currentTarget as HTMLElement).style.color = COLORS.text;
              }}
            >
              {mixer}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: COLORS.error,
            color: COLORS.text,
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Retour
        </button>
      </div>
    </div>
  );
};
