import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MessagesApi() {
  const [advice, setAdvice] = useState('');

  useEffect(() => {
    // Função para buscar um conselho da API
    const fetchAdvice = async () => {
      try {
        const response = await axios.get('https://api.adviceslip.com/advice');
        const { slip } = response.data;

        // Define o conselho no estado
        setAdvice(slip.advice);
      } catch (error) {
        console.error('Erro ao buscar conselho:', error);
      }
    };

    // Chama a função para buscar um conselho ao montar o componente
    fetchAdvice();
  }, []);

  return (
    <div>
      <h2>Conselhos: </h2>
      <p>{advice}</p>
    </div>
  );
}

export default MessagesApi;
