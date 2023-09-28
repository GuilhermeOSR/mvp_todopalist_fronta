# TODOPALIST FRONTEND Com React

Bem-vindo ao TODOPALIST! Aqui, você pode gerenciar suas tarefas de uma forma divertida e produtiva. Como um usuário fanático por "Dopamina," o TODOPALIST recompensa você com XP a cada tarefa concluída.


![Screenshot da aplicação](https://github.com/GuilhermeOSR/mvp_todopalist_fronta/blob/main/Projeto%20print.png?raw=true)

# Backend
Confira também o backend da aplicação desenvolvido em GraphQL: [Backend](https://github.com/GuilhermeOSR/mvp_todopalist_backc)


# Começando
Siga os passos abaixo para configurar e executar o frontend do TODOPALIST em seu ambiente local:



# Pré-requisitos
Certifique-se de ter o Node.js e o npm instalados em sua máquina. Você pode baixá-los em [nodejs.org](https://nodejs.org./en).

## Fonte de Dados Externa

Esta aplicação utiliza a [Advice Slip API](https://api.adviceslip.com/) para fornecer conselhos aleatórios. A API Advice Slip oferece conselhos inspiradores e divertidos para tornar sua experiência no TODOPALIST mais interessante.


# Instalação

1. Clone este repositório em seu computador.
`git clone https://github.com/seu-usuario/todopalist-frontend.git`

2. Navegue até o diretório do projeto:
`cd todopalist-frontend`

3. Instale as dependências executando o seguinte comando:
` npm install`

# Executando
Agora você pode iniciar a aplicação com o seguinte comando:
`npm start`

A aplicação será carregada em seu navegador padrão e estará disponível em 
**http://localhost:3000**.




# Docker:
Se preferir, você também pode usar Docker para executar a aplicação em um contêiner. Certifique-se de ter o Docker instalado em seu sistema.

1. Na raiz do projeto, crie uma imagem Docker com o seguinte comando:
`docker build -t topatodolist-frontend . `

2. Execute o contêiner com o seguinte comando:
`docker run -p 3000:3000 todopalist-frontend`

A aplicação estará disponível em **http://localhost:3000**.

Aproveite o TODOPALIST para uma experiência divertida e produtiva de gerenciamento de tarefas!




