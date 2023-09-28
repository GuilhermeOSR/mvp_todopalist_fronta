import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

/* Chama a Mutation do GraphQL para criar uma tarefa */
const CREATE_TASK = gql`
  mutation CreateTask($token: String!, $input: TaskInput!) {
    createTask(token: $token, input: $input) {
      task {
        id
        title
        description
        difficulty
        amount
        status
        dataInsercao
        userId
      }
    }
  }
`;

function CreateTask({isOpen, onClose}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Fácil');
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const [createTask] = useMutation(CREATE_TASK);

  const difficultyMap = {
    'Fácil': 1, 
    'Médio': 2,
    'Difícil': 3,
  };

  const handleSubmit = async (refetch) => {
    try {
      if (!title || !description || !difficulty) {
        setError('Todos os campos são obrigatórios');
        return;
      }
      if (title.length < 5 || description.length < 5) {
        setError('Título e descrição devem ter pelo menos 5 caracteres');
        return;
      }
      if (description.length > 30 || title.length > 30) {
        setError(`A descrição não pode ter mais de ${30} caracteres`);
        return;
      }

      const { data } = await createTask({
        variables: {
          token,
          input: {
            title,
            description,
            difficulty: difficultyMap[difficulty],
          },
        },
      });

      const newTask = data.createTask.task;

      console.log(newTask);
      setError(null);
      onClose();
    } catch (error) {
      console.error('Erro ao criar a tarefa:', error);
    }
  };

  return (
    <div className={`modal ${isOpen ? 'open' : 'closed'} TaskCreate`}>
      <h2 className='modal-title'>Adicionar Tarefa </h2>
      <div className='close-btn'>
        <button onClick={onClose} className='close-button'></button>
      </div>
      
      <label>Título</label>
    
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Digite o titulo da sua tarefa aqui"
      />
      

      <label>Descrição</label>
      <textarea
        rows="4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Escreva mais detalhes sobre a sua tarefa, observações, ou lembretes aqui"
      />

      <label>Dificuldade</label>
      <div className='select-container'>
        <select  className='select-box'
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">Escolha a dificuldade</option>
          <option value="Fácil">Fácil</option>
          <option value="Médio">Médio</option>
          <option value="Difícil">Difícil</option>
        </select>
        <div className='icon-container'>
          <i class="fa-solid fa-arrow-down"></i>
        </div>
      </div>

      <button className='btn-send' onClick={handleSubmit}>Enviar</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default CreateTask;
