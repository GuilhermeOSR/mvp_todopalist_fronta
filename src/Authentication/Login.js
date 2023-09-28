import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import './Login.css'; 

/* Chama a Mutation do GraphQL para o usuário logar */
const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    loginUser(username: $username, password: $password)
  }
`;

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [login, { loading, error }] = useMutation(LOGIN);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await login({
        variables: {
          username: formData.username,
          password: formData.password,
        },
      });

      // Processa o login bem-sucedido
      const token = data.loginUser;
      localStorage.setItem('token', token); // Armazena o token no localStorage
      console.log('Logged in with token:', token);
      window.location.href = '/dashboard'; // Envia para a a página Dashboard do usuário logado

   
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

   // Aplica a classe ao body apenas quando o componente de login estiver montado
   useEffect(() => {
    document.body.classList.add('login-body');
    return () => {
      document.body.classList.remove('login-body');
    };
  }, []);

  return (
  <div className='container'>
    <div className="login">
      <h1 className="login-title">Entre no "TODOPALIST"</h1>
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
          Entrar
        </button>
      </form>
      {error && <p>Erro ao fazer login: {error.message}</p>}
    </div>
    </div>
    <div className="register">
        <div className="register-content">
            <h2 className="register-title">Olá, amigo!</h2>
            <p className="register-subtitle">Venha organizar suas tarefas de uma forma motivadora!</p>
            <Link to="/" className="btn-register">CRIAR CONTA</Link>
        </div>
    </div>
  </div>
  );
}

export default Login;
