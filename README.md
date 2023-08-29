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

### Instalação e Execução
- Faça o download ou clone este repositório em seu ambiente de desenvolvimento.
- Abra o terminal e navegue até a pasta raiz do projeto.
- Execute o comando npm install para instalar as dependências.
- Configure as variáveis de ambiente no arquivo .env (consulte o exemplo .env.example).
- Execute o comando npm start para iniciar o servidor.

### Endpoints da API
### Endpoints de Cartões
- GET /cards - Obter todos os cartões.
- POST /cards - Criar um novo cartão.
- DELETE /cards/:cardId - Excluir um cartão.
- PUT /cards/:cardId/likes - Curtir um cartão.
- DELETE /cards/:cardId/likes - Não curtir um cartão.

### Endpoints de Usuários
- GET /users - Obter todos os usuários.
- - GET /users/:id - Obter usuário por ID.
- POST /users - Criar um novo usuário.
- PATCH /users/me - Atualizar perfil do usuário.
- PATCH /users/me/avatar - Atualizar avatar do usuário.

### Tecnologias Utilizadas
- React com Hooks, como useState e useEffect.
- Node.js para Plataforma de Backend.
- Express para o servidor back-end.
- MongoDB para armazenamento de dados.
- Autenticação de usuários com tokens JWT.
- Winston juntamente com o express-winston para criar e gerenciar registros de logs.
- CSS para estilização.

## Hospedagem no Google Cloud

Este projeto foi hospedado no Google Cloud para que você possa acessá-lo online. O backend do aplicativo foi implantado em uma instância do Google Compute Engine, enquanto o frontend está hospedado no Google Cloud Storage. Isso permite que você experimente o aplicativo sem precisar configurar nada localmente.

### Acesso ao Aplicativo

Para acessar o aplicativo hospedado, visite [https://aroundfinal.com.br](https://aroundfinal.com.br). Lá você encontrará a versão online do aplicativo, onde poderá criar, editar e gerenciar cartões de viagem, além de explorar as funcionalidades disponíveis.

### Observações

- Certifique-se de estar usando um navegador atualizado para obter a melhor experiência ao utilizar o aplicativo hospedado.
- Caso encontre qualquer problema ou tenha feedback sobre a hospedagem, sinta-se à vontade para nos informar através das Issues deste repositório.

Agradecemos por visitar o aplicativo hospedado no Google Cloud!


### Personalização do Projeto
- Para personalizar o aplicativo, você pode modificar os estilos CSS no diretório src/blocks.
- Personalize as mensagens de erro e validações de formulários no diretório src/utils.

### Licença
- Este projeto é open source. Você é livre para usar e modificar, desde que mantenha a atribuição dos autores originais.

### Link para o código fonte do Projeto
- Código-fonte do projeto: https://github.com/Evandro-developer/react-around-api-full_ptbr

#### Agradecimentos
- Agradecemos por acompanhar o desenvolvimento deste projeto.