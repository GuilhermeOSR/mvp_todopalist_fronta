// No seu componente App.js ou onde você lida com o roteamento

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Signup from './Authentication/Signup';
import Login from './Authentication/Login';
import Dashboard from './Pages/Dashboard/Dashboard';


import "./App.css"



const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  // Verifica se o token está presente no localStorage
  const isAuthenticated = !!localStorage.getItem('token');

  // Função para fazer o redirecionamento para a página de login
  const redirectToLogin = () => <Navigate to="/login" replace />;

  return (
    <ApolloProvider client={client}>
      <Router>
      <div className="App">
  
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {isAuthenticated ? (
              <Route path="/dashboard" element={<Dashboard />} />
            ) : (
              <Route path="/dashboard" element={redirectToLogin()}/>
            )}

          </Routes>
        </div>
      </Router>
      
    </ApolloProvider>
  );
}

export default App;
