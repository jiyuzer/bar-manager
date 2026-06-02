import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBar } from '../context/BarContext';
import { DrinkPicker } from '../components/DrinkPicker';
import { CloseTableModal } from '../components/CloseTableModal';
import { COLORS } from '../constants/colors';
import { OrderItem } from '../types';

const TableDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { tables, addOrder, removeOrder, toggleServed, updateTable, closeTable } = useBar();

  const [showDrinkPicker, setShowDrinkPicker] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [clientName, setClientName] = useState('');
  const [packageAmount, setPackageAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'history'>('orders');

  const table = tables.find((t) => t.id === id);

  if (!table) {
    return (
      <div
        style={{
          backgroundColor: COLORS.background,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p style={{ color: COLORS.text }}>Table non trouvée</p>
      </div>
    );
  }

  const total = table.orders.reduce((sum, order) => sum + order.price, 0);
  const jackpot = packageAmount ? Math.max(0, parseFloat(packageAmount) - total) : 0;
  const pendingCount = table.orders.filter((o) => !o.served).length;

  const handleAddOrder = (drink: { drinkId: string; drinkName: string; price: number; mixer?: string }) => {
    const newOrder: OrderItem = {
      id: `order_${Date.now()}`,
      drinkId: drink.drinkId,
      drinkName: drink.drinkName,
      price: drink.price,
      mixer: drink.mixer,
      served: false,
      timestamp: Date.now(),
    };
    addOrder(id!, newOrder);
  };

  const handleCloseTable = (method: string, cashAmount?: number) => {
    closeTable(id!, total, method, cashAmount);
    setShowCloseModal(false);
    navigate('/');
  };

  const groupedOrders = table.orders.reduce(
    (acc, order) => {
      const key = order.drinkId;
      if (!acc[key]) {
        acc[key] = { ...order, count: 0 };
      }
      acc[key].count += 1;
      return acc;
    },
    {} as Record<string, OrderItem & { count: number }>
  );

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
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '12px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none',
            border: 'none',
            color: COLORS.gold,
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          ← Retour
        </button>
        <h1 style={{ color: COLORS.gold, margin: 0, flex: 1 }}>{table.name}</h1>
      </div>

      {/* Client info section */}
      <div style={{ backgroundColor: COLORS.card, borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ color: COLORS.textSecondary, display: 'block', fontSize: '12px', marginBottom: '4px' }}>
              Nom du client
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Optionnel"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: `1px solid ${COLORS.border}`,
                backgroundColor: COLORS.background,
                color: COLORS.text,
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label style={{ color: COLORS.textSecondary, display: 'block', fontSize: '12px', marginBottom: '4px' }}>
              Forfait prix (€)
            </label>
            <input
              type="number"
              value={packageAmount}
              onChange={(e) => setPackageAmount(e.target.value)}
              placeholder="Optionnel"
              step="0.01"
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: `1px solid ${COLORS.border}`,
                backgroundColor: COLORS.background,
                color: COLORS.text,
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        <div style={{ backgroundColor: COLORS.card, borderRadius: '8px', padding: '12px' }}>
          <p style={{ color: COLORS.textSecondary, margin: '0', fontSize: '12px' }}>Total</p>
          <p style={{ color: COLORS.gold, margin: '4px 0 0 0', fontSize: '24px', fontWeight: 'bold' }}>€{total.toFixed(2)}</p>
        </div>
        {packageAmount && (
          <div style={{ backgroundColor: COLORS.card, borderRadius: '8px', padding: '12px' }}>
            <p style={{ color: COLORS.textSecondary, margin: '0', fontSize: '12px' }}>Jackpot</p>
            <p style={{ color: COLORS.success, margin: '4px 0 0 0', fontSize: '24px', fontWeight: 'bold' }}>€{jackpot.toFixed(2)}</p>
          </div>
        )}
        <div style={{ backgroundColor: COLORS.card, borderRadius: '8px', padding: '12px' }}>
          <p style={{ color: COLORS.textSecondary, margin: '0', fontSize: '12px' }}>En attente</p>
          <p style={{ color: COLORS.warning, margin: '4px 0 0 0', fontSize: '24px', fontWeight: 'bold' }}>{pendingCount}</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {['orders', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as 'orders' | 'history')}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: activeTab === tab ? COLORS.gold : COLORS.border,
              color: activeTab === tab ? COLORS.background : COLORS.text,
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
            }}
          >
            {tab === 'orders' ? 'Commandes' : 'Historique'}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'orders' ? (
        <div>
          {/* Orders list */}
          <div style={{ marginBottom: '20px' }}>
            {Object.entries(groupedOrders).map(([key, order]) => (
              <div
                key={key}
                style={{
                  backgroundColor: COLORS.card,
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p style={{ color: COLORS.text, margin: 0, fontWeight: 'bold' }}>{order.drinkName}</p>
                    {order.count > 1 && (
                      <span
                        style={{
                          backgroundColor: COLORS.gold,
                          color: COLORS.background,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                        }}
                      >
                        ×{order.count}
                      </span>
                    )}
                  </div>
                  {order.mixer && <p style={{ color: COLORS.textSecondary, margin: '4px 0 0 0', fontSize: '12px' }}>{order.mixer}</p>}
                  <p style={{ color: COLORS.gold, margin: '4px 0 0 0', fontSize: '12px' }}>€{(order.price * order.count).toFixed(2)}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => toggleServed(id!, table.orders.find((o) => o.drinkId === key && !o.served)?.id!)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: order.served ? COLORS.success : COLORS.warning,
                      color: COLORS.text,
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
                    {order.served ? '✓ Servi' : '⏳ Attente'}
                  </button>
                  <button
                    onClick={() => removeOrder(id!, table.orders.find((o) => o.drinkId === key)?.id!)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: COLORS.error,
                      color: COLORS.text,
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setShowDrinkPicker(true)}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: COLORS.gold,
                color: COLORS.background,
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              + Ajouter une boisson
            </button>
            <button
              onClick={() => setShowCloseModal(true)}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: COLORS.success,
                color: COLORS.text,
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
            >
              Clôturer
            </button>
          </div>
        </div>
      ) : (
        <div>
          {table.history.length === 0 ? (
            <p style={{ color: COLORS.textSecondary, textAlign: 'center', padding: '40px' }}>Aucun historique</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {table.history.map((entry) => (
                <div
                  key={entry.id}
                  style={{
                    backgroundColor: COLORS.card,
                    borderRadius: '8px',
                    padding: '12px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <p style={{ color: COLORS.text, margin: 0, fontWeight: 'bold' }}>€{entry.total.toFixed(2)}</p>
                    <p style={{ color: COLORS.textSecondary, margin: 0, fontSize: '12px' }}>
                      {new Date(entry.timestamp).toLocaleString('fr-FR')}
                    </p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                    {entry.paymentMethod === 'cash' && (
                      <p style={{ color: COLORS.textSecondary, margin: 0 }}>Espèces: €{entry.cashAmount?.toFixed(2)}</p>
                    )}
                    {entry.paymentMethod === 'card' && (
                      <p style={{ color: COLORS.textSecondary, margin: 0 }}>Carte: €{entry.cardAmount?.toFixed(2)}</p>
                    )}
                    {entry.paymentMethod === 'both' && (
                      <>
                        <p style={{ color: COLORS.textSecondary, margin: 0 }}>Espèces: €{entry.cashAmount?.toFixed(2)}</p>
                        <p style={{ color: COLORS.textSecondary, margin: 0 }}>Carte: €{entry.cardAmount?.toFixed(2)}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modals */}
      <DrinkPicker
        isOpen={showDrinkPicker}
        onClose={() => setShowDrinkPicker(false)}
        onSelectDrink={handleAddOrder}
      />
      <CloseTableModal
        isOpen={showCloseModal}
        total={total}
        onClose={() => setShowCloseModal(false)}
        onConfirm={handleCloseTable}
      />
    </div>
  );
};

export default TableDetailPage;
