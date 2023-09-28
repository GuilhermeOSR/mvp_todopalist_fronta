import React from 'react';
import { useQuery, gql } from '@apollo/client';
import UserXPBar from './UserXpBar';

import emblema from '../Pages/Dashboard/imgs/emblema.png'

/* Chama a Mutation do GraphQL para receber as informações do usuário pelo token */
const GET_USER_INFO = gql`
  query GetUserInfo($token: String!) {
    user(token: $token) {
      username
      level
      xp
      xpToNextLevel
    }
  }
`;

function UserInfo({ token }) {
  const { loading, error, data } = useQuery(GET_USER_INFO, {
    variables: { token },
    
  });
  
  if (loading) return <p>Carregando informações do usuário...</p>;
  if (error) return <p>Ocorreu um erro ao carregar as informações do usuário.</p>;
  
  const user = data.user;

  return (
    <div className='UserInfo'>
      <div className="User-stats">
        <h3 className="User-username">{user.username}</h3>
        <p className="User-level">LVL {user.level}</p>
        <UserXPBar user={user}/>
      </div>
      <div className='icon'>
        <img className='emblema' src={emblema} alt='emblema do usuário' />
      </div>
    </div>
  );
}

export default UserInfo;
