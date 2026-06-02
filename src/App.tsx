import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BarProvider } from './context/BarContext';
import TableListPage from './pages/TableListPage';
import TableDetailPage from './pages/TableDetailPage';
import { COLORS } from './constants/colors';

function App() {
  return (
    <BarProvider>
      <BrowserRouter>
        <div style={{ backgroundColor: COLORS.background, minHeight: '100vh' }}>
          <Routes>
            <Route path="/" element={<TableListPage />} />
            <Route path="/table/:id" element={<TableDetailPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </BarProvider>
  );
}

export default App;
