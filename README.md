### [English Version](#project-16-react-around-api-full)
---

# Projeto 16: React Around API Full
## Descrição do Projeto:
Este é o projeto final do curso de desenvolvimento web da Practicum, que consiste em um aplicativo completo chamado "React Around API Full". O projeto é uma evolução do projeto "Around The U.S." desenvolvido anteriormente, com a adição de um back-end e outras funcionalidades avançadas.

## Principais Recursos
- Um aplicativo completo que combina o front-end React com um back-end Express e MongoDB.
- Integração total com um servidor back-end, permitindo adicionar, curtir e gerenciar cartões de viagem, além de editar perfis de usuário.
- Utilização do React como principal framework para a interface do usuário, com componentes modulares e reativos.
- Implementação de autenticação de usuários com tokens JWT.
- Uso de rotas protegidas para garantir que apenas usuários autenticados tenham acesso a certas partes do aplicativo.
- Integração com um banco de dados MongoDB para armazenamento persistente de dados.
- Uso de modelos e controladores para organizar a lógica do back-end de forma eficiente.
- Endpoints de API documentados para acesso a cartões e usuários.
**Observação:** Além disso, esta API RESTful também atende a uma versão do projeto em JavaScript Vanilla, além da versão em React.

## Instalação e Execução
- Faça o download ou clone este repositório em seu ambiente de desenvolvimento.
- Abra o terminal e navegue até a pasta raiz do projeto.
- Execute o comando npm install para instalar as dependências.
- Configure as variáveis de ambiente no arquivo .env (consulte o exemplo .env.example).
- Execute o comando npm start para iniciar o servidor.

## Endpoints da API
### Endpoints de Cartões
- GET /cards - Obter todos os cartões.
- POST /cards - Criar um novo cartão.
- DELETE /cards/:cardId - Excluir um cartão.
- PUT /cards/:cardId/likes - Curtir um cartão.
- DELETE /cards/:cardId/likes - Não curtir um cartão.

### Endpoints de Usuários
- GET /users - Obter todos os usuários.
- GET /users/:id - Obter usuário por ID.
- POST /users - Criar um novo usuário.
- PATCH /users/me - Atualizar perfil do usuário.
- PATCH /users/me/avatar - Atualizar avatar do usuário.

## Tecnologias Utilizadas
- React com Hooks, como useState e useEffect na versão React JavaScript Edition.
- Java Script Vanilla na versão Vanilla JavaScript Edition.
- Node.js para Plataforma de Backend.
- Express para o servidor back-end.
- MongoDB para armazenamento de dados.
- Autenticação de usuários com tokens JWT.
- Winston juntamente com o express-winston para criar e gerenciar registros de logs.
- CSS para estilização.

## Hospedagem no Google Cloud
Este projeto foi hospedado no Google Cloud para que você possa acessá-lo online. O backend do aplicativo foi implantado em uma instância do Google Compute Engine, enquanto o frontend está hospedado no Google Cloud Storage. Isso permite que você experimente o aplicativo sem precisar configurar nada localmente.

## Acesso ao Aplicativo
Para acessar o aplicativo hospedado, visite visite os links abaixo. Lá você encontrará a versão online do aplicativo, onde poderá criar, editar e gerenciar cartões de viagem, além de explorar as funcionalidades disponíveis.
O nosso backend agora serve dois frontends diferentes, cada um com sua própria experiência única:

- **Frontend ReactJS:** Você pode explorar a versão do aplicativo construída com ReactJS, acessando [https://reactjs.aroundfinal.com.br](https://reactjs.aroundfinal.com.br).

- **Frontend Vanilla JavaScript:** Também oferecemos uma versão do aplicativo desenvolvida com Vanilla JavaScript. Você pode acessá-la em [https://vanillajs.aroundfinal.com.br](https://vanillajs.aroundfinal.com.br).

Esperamos que você aproveite as duas versões do aplicativo e escolha a que melhor atenda às suas necessidades.

## Observações
- Certifique-se de estar usando um navegador atualizado para obter a melhor experiência ao utilizar o aplicativo hospedado.
- Caso encontre qualquer problema ou tenha feedback sobre a hospedagem, sinta-se à vontade para nos informar através das Issues deste repositório.

Agradecemos por visitar o aplicativo hospedado no Google Cloud!

## Personalização do Projeto
- Para personalizar o aplicativo, você pode modificar os estilos CSS no diretório src/blocks.
- Personalize as mensagens de erro e validações de formulários no diretório src/utils.

## Licença
- Este projeto é open source. Você é livre para usar e modificar, desde que mantenha a atribuição dos autores originais.

## Link para o código fonte do Projeto
- Código-fonte do projeto: https://github.com/Evandro-developer/react-around-api-full_ptbr

## Agradecimentos
- Agradecemos por acompanhar o desenvolvimento deste projeto.

---

### [Versão em Português](#projeto-16-react-around-api-full)
---

# Project 16: React Around API Full
## Project Description:
This is the final project of the Practicum web development course, which consists of a complete application called "React Around API Full." The project is an evolution of the previously developed "Around The U.S." project, with the addition of a backend and other advanced features.

## Key Features
- A complete application that combines React frontend with an Express backend and MongoDB.
- Full integration with a backend server, allowing for adding, liking, and managing travel cards, as well as editing user profiles.
- Utilization of React as the primary framework for the user interface, with modular and reactive components.
- Implementation of user authentication with JWT tokens.
- Use of protected routes to ensure that only authenticated users have access to certain parts of the application.
- ntegration with a MongoDB database for persistent data storage.
- Use of models and controllers to efficiently organize backend logic.
- Documented API endpoints for card and user access.

**Note:** In addition, this RESTful API also serves a version of the project in Vanilla JavaScript, in addition to the React version.

## Installation and Execution
- Download or clone this repository to your development environment.
- Open the terminal and navigate to the project's root folder.
- Run the command npm install to install the dependencies.
- Configure environment variables in the .env file (see the .env.example example).
- Run the command npm start to start the server.

## API Endpoints
### Card Endpoints
- GET /cards - Get all cards.
- POST /cards - Create a new card.
- DELETE /cards/:cardId - Delete a card.
- PUT /cards/:cardId/likes - Like a card.
- DELETE /cards/:cardId/likes - Dislike a card.

### User Endpoints
- GET /users - Get all users.
- GET /users/:id - Get user by ID.
- POST /users - Create a new user.
- PATCH /users/me - Update user profile.
- PATCH /users/me/avatar - Update user avatar.

## Technologies Used
- React with Hooks, such as useState and useEffect in the React JavaScript Edition version.
- Vanilla JavaScript in the Vanilla JavaScript Edition version.
- Node.js for Backend Platform.
- Express for the backend server.
- MongoDB for data storage.
- User authentication with JWT tokens.
- Winston along with express-winston for creating and managing log records.
- CSS for styling.

## Hosting on Google Cloud
This project has been hosted on Google Cloud so you can access it online. The backend of the application has been deployed on a Google Compute Engine instance, while the frontend is hosted on Google Cloud Storage. This allows you to experience the application without the need for local setup.

## Access to the Application
To access the hosted application, please visit the links below. There, you will find the online version of the application, where you can create, edit, and manage travel cards, as well as explore the available features.
Our backend now serves two different frontends, each with its unique experience:

- **ReactJS Frontend:** You can explore the application version built with ReactJS by visiting https://reactjs.aroundfinal.com.br.

- **Vanilla JavaScript Frontend:** We also offer a version of the application developed with Vanilla JavaScript. You can access it at https://vanillajs.aroundfinal.com.br.

We hope you enjoy both versions of the application and choose the one that best suits your needs.

## Notes
Make sure to use an up-to-date browser for the best experience when using the hosted application.
If you encounter any issues or have feedback about the hosting, feel free to let us know through the Issues in this repository.

Thank you for visiting the application hosted on Google Cloud!

## Project Customization
To customize the application, you can modify the CSS styles in the src/blocks directory.
Customize error messages and form validations in the src/utils directory.

## License
This project is open source. You are free to use and modify it as long as you maintain attribution to the original authors.

## Link to Project Source Code
Project source code: https://github.com/Evandro-developer/react-around-api-full_ptbr

## Acknowledgments
We appreciate your support in following the development of this project.