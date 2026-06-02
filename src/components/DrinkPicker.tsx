import React, { useState } from 'react';
import { COLORS } from '../constants/colors';
import { DRINKS, DRINK_CATEGORIES } from '../constants/drinks';
import { MixerModal } from './MixerModal';

interface DrinkPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDrink: (drink: { drinkId: string; drinkName: string; price: number; mixer?: string }) => void;
}

export const DrinkPicker: React.FC<DrinkPickerProps> = ({
  isOpen,
  onClose,
  onSelectDrink,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('spirits');
  const [selectedDrinkId, setSelectedDrinkId] = useState<string | null>(null);
  const [showMixerModal, setShowMixerModal] = useState(false);

  if (!isOpen) return null;

  const categoryDrinks = DRINKS.filter((d) => d.category === selectedCategory);

  const handleDrinkSelect = (drinkId: string) => {
    const drink = DRINKS.find((d) => d.id === drinkId);
    if (drink?.requiresMixer) {
      setSelectedDrinkId(drinkId);
      setShowMixerModal(true);
    } else {
      onSelectDrink({
        drinkId,
        drinkName: drink?.name || '',
        price: drink?.price || 0,
      });
      onClose();
    }
  };

  const handleMixerSelect = (mixer: string) => {
    const drink = DRINKS.find((d) => d.id === selectedDrinkId);
    if (drink) {
      onSelectDrink({
        drinkId: selectedDrinkId,
        drinkName: drink.name,
        price: drink.price,
        mixer,
      });
      onClose();
    }
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'flex-end',
          zIndex: 100,
        }}
        onClick={onClose}
      >
        <div
          style={{
            backgroundColor: COLORS.card,
            width: '100%',
            borderRadius: '16px 16px 0 0',
            padding: '20px',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: COLORS.text, margin: 0 }}>Sélectionner une boisson</h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: COLORS.text,
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>
          </div>

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto' }}>
            {DRINK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: selectedCategory === cat.id ? COLORS.gold : COLORS.border,
                  color: selectedCategory === cat.id ? COLORS.background : COLORS.text,
                  cursor: 'pointer',
                  fontWeight: selectedCategory === cat.id ? 'bold' : 'normal',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Drinks grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
            {categoryDrinks.map((drink) => (
              <button
                key={drink.id}
                onClick={() => handleDrinkSelect(drink.id)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${COLORS.gold}`,
                  backgroundColor: COLORS.border,
                  color: COLORS.text,
                  cursor: 'pointer',
                  textAlign: 'center',
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
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{drink.name}</div>
                <div style={{ fontSize: '12px', marginTop: '4px' }}>€{drink.price.toFixed(2)}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <MixerModal
        isOpen={showMixerModal}
        onClose={() => setShowMixerModal(false)}
        onSelectMixer={handleMixerSelect}
      />
    </>
  );
};
