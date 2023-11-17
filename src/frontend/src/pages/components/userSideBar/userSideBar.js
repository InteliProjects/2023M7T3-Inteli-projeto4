import React from 'react';

const UserSideBar = () => {
  return (
    <div className="user-sidebar">
      <h2>Minha Conta</h2>
      <ul>
        <li><a href="#">Histórico de Perguntas</a></li>
        <li><a href="#">Configurações da Conta</a></li>
        <li><a href="#">Deslogar</a></li>
      </ul>
    </div>
  );
};

export default UserSideBar;