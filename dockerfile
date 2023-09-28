# Use a imagem de node.js como base
FROM node:14

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Execute o comando 'npm install' para instalar as dependências
RUN npm install

# Copie o restante do código-fonte do aplicativo para o diretório de trabalho
COPY . .

# Execute o comando 'npm build' para criar a versão otimizada do aplicativo React
RUN npm run build

# Exponha a porta 30 00 para que o aplicativo seja acessível fora do contêiner
EXPOSE 3000

# Comando para iniciar o servidor web (geralmente o servidor HTTP do React, como serve)
CMD [ "npm", "start" ]
