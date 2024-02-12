import React from 'react';
import { Link } from 'react-router-dom';
import '../Style/Menu.css'; // Importar o arquivo de estilo CSS

const Menu = () => {
  return (
    <div className="menu-container">
      <div className="logo-container">
        {/* Adicione a imagem do seu logo ou o texto do logo aqui */}
        <h1>Seu Logo</h1>
      </div>

      <div className="button-container">
        {/* Botão para a página de cadastro */}
        <Link to="/cadastrar">
          <button>Cadastrar</button>
        </Link>

        {/* Botão para a página fictícia ProcurarEventos */}
        <Link to="/procurar-eventos">
          <button>Procurar Eventos</button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
