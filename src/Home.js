import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Bem-vindo à Página Inicial</h2>
      {/* Adicione o conteúdo da sua página inicial aqui */}

      {/* Botão para a página de cadastro */}
      <Link to="/cadastrar">
        <button>Cadastrar</button>
      </Link>

      {/* Botão para a página fictícia ProcurarEventos */}
      <Link to="/procurar-eventos">
        <button>Procurar Eventos</button>
      </Link>
    </div>
  );
};

export default Home;
