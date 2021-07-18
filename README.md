# Desafio Final do bootcamp de Full-Stack IGTI

Projeto criado para a atividade de avaliação final no curso de Full-Stack do IGTI, na segunda turma de 2020. Elaborado a partir de uma base previamente disponibilizada pelo professor, o intuito é simular uma aplicação de gerenciamento financeiro. Para manipular e exibir informações no front-end é utilizado o React.js. No processamento de dados e comunicação de API é utilizado o Node.js. O armazenamento e manutenção de dados são realizados no MongoDB. O deploy da aplicação foi realizado na plataforma do Heroku.


## Projeto Base

Para desenvolver a aplicação em tempo hábil, foi disponibilizado para os alunos um projeto com a base tanto do front quanto do back. Para o front-end foi tomada como referência a aplicação do create-react-app. No back-end foi entregue a definição de rota base da API, a base da comunicação com o MongoDB e o schema de dados. Também foi disponibilizada uma base de dados previamente gerada para a avaliação. A criação dos componentes, folha de estilos, manipulação de estado, renderização da aplicação, tratamento de requisições, processamento e manutenção de dados ficaram a cargo dos alunos do curso.


## Front-End

No front-end temos a tela principal com as informações financeiras de um determinado mês, de acordo com o período (mês-ano) escolhido pelo usuário no seletor. Logo abaixo é apresentado um pequeno resumo a respeito dos lançamentos do mês, um filtro de pesquisa por descrição e um botão para adicionar novos lançamentos. A lista de todos lançamentos do mês possui botões de ação para edição e exclusão individual. Como tela secundária temos a inclusão/alteração de lançamentos, com os campos pertinentes aos dados e botões de ação para salvar e cancelar a operação. Foi definido no enunciado da atividade que somente estarão disponíveis os meses pertinentes ao ano atual, ano anterior e ano posterior a data presente.


## Back-End

No back-end temos rotas de API definidas para receber requisições de captura, inclusão, edição e exclusão de lançamentos. Regras transacionais para processar e responder cada uma das requisições enviadas pelo front-end, de acordo com a regra de negócio definida no enunciado. Comunicação com o MongoDB para coletar, manipular e persistir informações na base de dados.


## Tecnologias

#### Front-End:
- [React](https://www.reactjs.org/)
- [Materialize CSS](https://materializecss.com/)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Axios](https://axios-http.com/)

#### Back-End
- [Node.JS](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Cors](https://github.com/expressjs/cors)
- [Dotenv](https://github.com/motdotla/dotenv)
- [Nodemon](https://nodemon.io/)

#### Database
- [MongoDB (Atlas)](https://www.mongodb.com/)
- [MongoDB Compass](https://www.mongodb.com/pt-br/products/compass)
- [Robo 3T (Robomongo)](https://robomongo.org/)


### Prévia

[![image](https://user-images.githubusercontent.com/68196346/126052382-d39d026e-43f5-4448-9d9b-f859583eb0ea.png)](https://final-igti-full-stack.herokuapp.com/)
