import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

/* Chama a Mutation do GraphQL para registrar o usuário */
const REGISTER_USER = gql`
  mutation RegisterUser($input: UserRegisterInput!) {
    registerUser(input: $input) {
      id
      username
    }
  }
`;

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const [registerUser, { loading }] = useMutation(REGISTER_USER);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username.length < 3) {
      // Exibir mensagem de erro para usernames muito curtos
       setError('Username deve ter no mínimo 3 caracteres');
      return;
    }
    if (formData.password.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres');
      
      return;
    }
    try {
      const { data } = await registerUser({
        variables: {
          input: {
            username: formData.username,
            password: formData.password,
          },
        },
      });
      window.location.href = '/login';
      // Handle successful registration (you can redirect to login here)
      console.log('User registered:', data.registerUser.username);
    } catch (error) {
      console.error('Registration error:', error.message);
      
    }
  };

  return (
    <div className='container'>
      <div className="login">
        <h1 className="login-title">Crie sua conta!</h1>
        <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-group"
              placeholder='Usuário'
            />
          </div>
          <div className='form-group'>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-group"
              placeholder='Senha'
            />
          </div>
          <button type="submit" disabled={loading} className="btn-login">
            Criar conta
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        {error && <p>Erro ao criar a conta {error.message}</p>}
      </div>
      </div>
      <div className="register register-login">
          <div className="register-content">
              <h2 className="register-title">Bem-vindo</h2>
              <p className="register-subtitle">Olá velho amigo! Como tem passado? Está pronto para sua próxima tarefa?</p>
              <Link to="/login" className="btn-register">Entrar</Link>
          </div>
      </div>
    </div>
    );
}

export default Register;
