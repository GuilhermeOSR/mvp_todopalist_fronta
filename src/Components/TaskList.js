import React, { useState} from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import {AiOutlineArrowRight} from 'react-icons/ai'
import {AiOutlineArrowLeft} from 'react-icons/ai'

import DeleteTaskButton from './DeleteTaskButton';
import EditTaskForm from './EditTaskForm';

import potxp from '../Pages/Dashboard/imgs/potxp.png'

/* Chama a Mutation do GraphQL para listar usuários e tarefas */

const GET_USER_TASKS = gql`
  query GetUserTasks($token: String!, $offset: Int!, $limit: Int!) {
    user(token: $token) {
      id
      xp
      level
      xpToNextLevel
    }
    tasks(token: $token, offset: $offset, limit: $limit) {
      id
      title
      description
      amount
      difficulty
      status
      userId
    }
  }
`;

/* Chama a Mutation do GraphQL para atualizar status da tarefa, caso ela seja concluida */

const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($token: String!, $taskId: ID!) {
    completeTask(token: $token, taskId: $taskId) {
      id
    }
  }
`;

/* Chama a Mutation do GraphQL para deletar uma tarefa */

const DELETE_TASK = gql`
  mutation DeleteTask($token: String!, $taskId: ID!) {
    deleteTask(token: $token, taskId: $taskId) {
      id
    }
  }
`;

/* Chama a Mutation do GraphQL para atribuir xp ao usuário */
const GAIN_XP_TASK = gql`
  mutation GainXpTask($token: String!, $amount: Int!) {
    gainXp(token: $token, amount: $amount) {
      xp
      level
      xpToNextLevel
    }
  }
`;


function TaskList({ token }) {
  const [offset, setOffset] = useState(0);
  const limit = 3;
  

  const { loading, error, data, refetch } = useQuery(GET_USER_TASKS, {
    variables: { token, offset, limit },
  });

  refetch();

  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS);
  const [gainXpTask] = useMutation(GAIN_XP_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro ao carregar as tarefas.</p>;

  const tasks = data.tasks;
  const user = data.user;

  const handleTaskStatusChange = async (taskId, amount) => {
    try {
      await updateTaskStatus({
        variables: {
          token,
          taskId,
        },
      });

      const { data: gainXpData } = await gainXpTask({
        variables: {
          token,
          amount,
        },
        
      });

      user.level = gainXpData.gainXp.level;
      user.xpToNextLevel = gainXpData.gainXp.xpToNextLevel;

      refetch();
    } catch (error) {
      console.error('Erro ao atualizar o status da tarefa:', error);
    }
  };

  const handleTaskDeletion = async (taskId) => {
    try {
      await deleteTask({
        variables: {
          token,
          taskId,
        },
      });

      refetch();

    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
    }
  };

  // Paginação

  const handlePageChange = (newOffset) => {
    setOffset(newOffset);
    refetch({ offset: newOffset, limit });
  };

  
  // Dificuldade
  function mapDifficulty(difficulty) {
    switch (difficulty) {
      case 1:
        return "Fácil";
      case 2:
        return "Médio";
      case 3:
        return "Difícil";
      default:
        return "Desconhecida";
    }
  }



  return (
    <div className='TaskList'>
  <ul>
    {tasks.map((task) => (
      <li key={task.id}>
          <div className='check-content'>
            <input
            type="checkbox"
            checked={task.status}
            onChange={() => handleTaskStatusChange(task.id, task.amount)}
            disabled={task.status}
            className='checkbox'
            />
        <div className='content'>
          <h3 className={task.status ? 'completed' : ''}>{task.title}</h3>
          <p className={`description ${task.status ? 'completed' : ''}`}>{task.description}</p>
          <p className={mapDifficulty(task.difficulty)}></p>
        </div>
        </div>
        <div className='buttons'>
          <div className='btn-wrapper'>
            <DeleteTaskButton taskId={task.id} onDelete={handleTaskDeletion} />
          </div>
          <div className='btn-wrapper'>
            {!task.status && (
              <EditTaskForm
                token={token}
                taskId={task.id}
                onTaskUpdated={refetch}
              />
              
            )}
             </div>
          </div>
      </li>
    ))}
  </ul>
  
  <div className="pagination-container">
        <img className='potxp' src={potxp} alt='pote de xp' />
        <button
          onClick={() => handlePageChange(offset - limit)}
          disabled={offset <= 0}
          className="pagination-button previous"
        >
          <AiOutlineArrowLeft />
        </button>
    
        <button
          onClick={() => handlePageChange(offset + limit)}
          disabled={tasks.length < limit}
          className="pagination-button next"
          
        >
             <AiOutlineArrowRight />
        </button>
        
      </div>
</div>

  );
}

export default TaskList;
