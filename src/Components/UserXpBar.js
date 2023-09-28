import React, { useState, useEffect } from 'react';

function UserXPBar({ user }) {
  // Define um estado local para controlar o preenchimento da barra de XP
  const [xpBarWidth, setXPBarWidth] = useState(0);

  // Usa o useEffect para atualizar o preenchimento da barra sempre que o XP do usuário mudar
  useEffect(() => {
    // Verifica se 'user' é verdadeiro antes de calcular a porcentagem
    if (user) {
      // Calcula a porcentagem de XP atual em relação ao XP necessário para o próximo nível
      const percentage = (user.xp / user.xpToNextLevel) * 100;

      // Atualiza o estado local para refletir a porcentagem calculada
      setXPBarWidth(percentage);
    }
  }, [user]);

  return (
    <div className="User-xpbar">
      <div className="User-xpbar-fill" style={{ width: `${xpBarWidth}%` }}></div>
      {user ? (
        <p className="User-xp">{user.xp}/{user.xpToNextLevel}</p>
      ) : (
        <p className="User-xp">Carregando...</p>
      )}
    </div>
  );
}

export default UserXPBar;
