import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Cadastrar from './Cadastrar';
import Menu from '../src/components/Menu'; // Importar o componente Menu

const App = () => {
  return (
    <Router>
      <div>
        <Menu /> {/* Adicione o componente Menu aqui */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrar" element={<Cadastrar />} />
          <Route path="/procurar-eventos" element={<div>Procurar Eventos</div>} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
