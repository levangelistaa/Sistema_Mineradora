import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Workers from './pages/Workers';
import Cities from './pages/Cities';
import ServicesPage from './pages/Services';
import Equipaments from './pages/Equipaments';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="funcionarios" element={<Workers />} />
          <Route path="cidades" element={<Cities />} />
          <Route path="servicos" element={<ServicesPage />} />
          <Route path="equipamentos" element={<Equipaments />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;