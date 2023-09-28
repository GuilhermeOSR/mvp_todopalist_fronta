
import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client'; // Certifique-se de importar o gql

/* Chama a Mutation do GraphQL para pesquisar por tarefas */
const SEARCH_TASKS = gql`
  query SearchTasks($token: String!, $termo: String) {
    tasks(token: $token, termo: $termo) {
      id
      title
      description
      difficulty
      status
      userId
    }
  }
`;

function TaskSearch() {
  const [termo, setTermo] = useState('');
  const [searchTasks, { loading, data }] = useLazyQuery(SEARCH_TASKS);

  const handleInputChange = (e) => {
    const novoTermo = e.target.value;
    setTermo(novoTermo);

    // Envia a consulta GraphQL quando o usuário digitar
    searchTasks({ variables: { token: localStorage.getItem('token'), termo: novoTermo } });
  };

  return (
    <div className='TaskSearch'>
      <input
        type="text"
        placeholder="Pesquisar tarefas"
        value={termo}
        onChange={handleInputChange}
      />
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {data?.tasks.map((task) => (
            <li key={task.id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
              <p>{task.status}</p>
              <input
              type="checkbox"
              checked={task.status}
              disabled={task.status}
            />
            <label>Status: {task.status ? 'Concluída' : 'Pendente'}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskSearch;
