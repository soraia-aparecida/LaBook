# LaBook

### Descrição
- API para uma rede social
- Principais funcionalidades: cadastrar/visualizar informações de usuários e posts. Fazer e desfazer amizade. Like e deslike em post.

### Como usar

- Cadastrar novo usuário: usar o endpoint signup. Passanod via body as seguintes informações: name, email e password. Automaticamente, também, já realizado login, após o cadastro.

- Login: usar o endpoint login. Passando via body as seguintes informações: email, password.

- Fazer amizade: usar o endpoint makeFriendship. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de se tornar amigo de outro usuário, colocando o token, no campo de Headers - Authorization, depois  passa no campo Body, a seguinte informação: friend_id, que é o id, da pessoa que se deseja tornar amigo. Automaticamente, o outro usuário também se torna amigo dessa pessoa.

- Desfazer amizade: usar o endpoint unfriend. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de deixar de ser amigo, colocando o token, no campo de Headers - Authorization, depois  passa no campo Body, a seguinte informação: unfriend_id, que é o id, da pessoa que se deseja deixar de ser amigo. Automaticamente, o outro usuário também deixa de ser amigo dessa pessoa.

- Pegar um post: usar o enpoint getPostById. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de pegar um post específico, colocando o token, no campo de Headers - Authorization, e passando o id do post no campo de Path Variables - id.

- Criar um post: usar o enpoint createPost. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de cadastrar post, colocando o token, no campo de Headers - Authorization, e passando no campo Body, as seguintes informações: photo_url, description e post_type. Para post_type temos duas opções: EVENTO ou NORMAL.

- Adicionar comentário em um post: usar o enpoint addComment. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de adicionar comentário, colocando o token, no campo de Headers - Authorization,  passando no campo Body, as seguintes informações: post_id, que é o id do post, e comment.

- Curti um post: usar o enpoint likePost. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de like, colocando o token, no campo de Headers - Authorization,  passando no campo Body, o post_id.

- Descutir um post: usar o enpoint deslikePost. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de deslike, colocando o token, no campo de Headers - Authorization, e passando no campo Body, o post_id.

- Feed: usar o endpoint feed. Primeiro o usuário faz login, depois, com o token que é liberado no login, ele bate nesse endpoint de feed, colocando o token, no campo de Headers - Authorization, informando o Request Params - page, que o número dá página que se deseja visualizar, cada página mostra até 5 posts.
Os post que serão mostrados, são os posts de pessoas que esse usuário é amigo, elas aparecem em ordem de criação, ou seja, das mais atuais até as mais antigas.
Se informado o Request Params - type, ele retorna todos os posts daquele type, independente desse usuário ser amigo ou não das pessoas que criaram aqueles determinados post.

* Para mais informações, sobre como usar essa API, consultar a documentação no Postaman, pois nela, tem exemplos de como usar cada enpoint.

### Tecnologias utulizadas:
- Typescript
- Node.js
- Dotenv
- Express
- Cors
- MySQL
- Knex
- UUID
- Jsonwebtoken
- Bcryptjs

### Documentação do Postaman
https://documenter.getpostman.com/view/18384258/UVsLS6fH

### Documentação do Heroku
https://projeto-labook-soraia.herokuapp.com/


