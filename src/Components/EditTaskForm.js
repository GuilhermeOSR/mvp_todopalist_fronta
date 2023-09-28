import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

/* Chama a Mutation do GraphQL para editar a tarefa */
const UPDATE_TASK = gql`
  mutation UpdateTask($token: String!, $taskId: ID!, $input: TaskInput!) {
    updateTask(token: $token, taskId: $taskId, input: $input) {
      id
      title
      description
      difficulty
      status
    }
  }
`;

function EditTaskForm({ token, taskId, onTaskUpdated }) {
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [taskInput, setTaskInput] = useState({
    title: '',
    description: '',
    difficulty: 1, 
  });
  

  const [updateTask] = useMutation(UPDATE_TASK);

const handleEditClick = () => {
  setEditMode(true);
  // Preenche os campos do formulário com os valores atuais da tarefa
  setTaskInput({
    title: task.title,
    description: task.description,
    difficulty: task.difficulty,
  });
};

const handleSaveClick = async () => {
  try {
    if (!taskInput.title || !taskInput.description) {
        setError('Todos os campos são obrigatórios');
      return;
    }

    if (taskInput.title.length < 5 || taskInput.description.length < 5) {
      setError('Título e descrição devem ter pelo menos 5 caracteres');
      return;
    }

    if (taskInput.description.length > 30 || taskInput.title.length > 30) {
      setError(`A descrição não pode ter mais de ${30} caracteres`);
      return;
    }

    // Converte taskInput.difficulty para um número inteiro
    const difficulty = parseInt(taskInput.difficulty);

    // Execute a mutação para atualizar a tarefa
    const { data } = await updateTask({
      variables: {
        token,
        taskId,
        input: { ...taskInput, difficulty }, // Atualize o input com a dificuldade como um número inteiro
      },
    });

    // Verifica se a mutação foi bem-sucedida
    if (data.updateTask) {
 
      onTaskUpdated(data.updateTask);
      setEditMode(false); // sai do modo de edição
    }
  } catch (error) {
    console.error('Erro ao atualizar a tarefa:', error);
  }
};

  const handleCancelClick = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    // Atualiza o estado do input conforme o usuário digita
    setTaskInput({
      ...taskInput,
      [e.target.name]: e.target.value,
    });
  };

  const task = {
    title: taskInput.title,
    description: taskInput.description,
    difficulty: taskInput.difficulty,
  };
  

  return (
    <div>
      {error && <p className="error">{error}</p>}
      {editMode ? (
        <div>
          <input
            type="text"
            name="title"
            placeholder="Título"
            value={taskInput.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={taskInput.description}
            onChange={handleChange}
          />
          <select
            name="difficulty"
            value={taskInput.difficulty}
            onChange={handleChange}
          >
            <option value={1}>Fácil</option>
            <option value={2}>Médio</option>
            <option value={3}>Difícil</option>
          </select>
          <button onClick={handleSaveClick}>Salvar</button>
          <button onClick={handleCancelClick}>Cancelar</button>
        </div>
      ) : (
        <button onClick={handleEditClick}>Editar</button>
      )}
    </div>
  );
}

export default EditTaskForm;
