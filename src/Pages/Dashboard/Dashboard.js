import React, { useState } from 'react';

import TaskList from '../../Components/TaskList';
import UserInfo from '../../Components/UserInfo';
import CreateTask from '../../Components/CreateTask';


import './Dashboard.css'
import carta1 from './imgs/carta-1.png'
import MessagesApi from '../../Components/MessagesApi';


function Dashboard() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem('token'); // Obtenha o token do localStorage


  // Função para abrir o modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
  };


   // Função para fazer logout
   const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');

    // Redireciona o usuário para a página de login
    window.location.href = '/';
  };

  return (
    <div className="App dashboard">
      <div className='userInfo'>
        <UserInfo token={token}/>
      </div>
      <div className='btn-modal'>
        <img src={carta1} className='carta1' onClick={openModal} alt='botao para adicionar tarefa'/>
      </div>
        <div className='book-container'>
          <div className='book'>
            <TaskList token={token}/> 
            <div className='logout'>
      {token && (
        <button onClick={handleLogout} className='LogoutButton'>Deslogar</button>
        
      )}
      </div>
          </div>
          <MessagesApi />
        </div>
      {isModalOpen && (
              // Renderiza o componente CreateTask apenas quando isModalOpen for true
       
                <div className='modal-container'>
                <div className='modal'>
                  <CreateTask isOpen={isModalOpen} onClose={closeModal} />
                </div>

              </div>
            )}
    </div>

  );
}

export default Dashboard;
