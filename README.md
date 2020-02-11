# Personal Tasks
Foi utilizado a seguinte Stack no projeto.

Backend => NodeJS

Database => MongoDB

Mobile => React-Native

Para colocar backend em produção foi usado o serviço Cloud Functions do Firebase

## FRONTEND

Aplicativo está totalmente funcional e produção, no repositório segue o apk caso queiram instalar para verificar.

## BACKEND

### TAREFAS
+ **POST** - /task/add

> Adiciona uma nova tarefa

> Espera receber um JSON contendo os campos

```
 title *
 content *
 latitude
 longitude
 date
```
+ **GET** - /task/listTasksByUser

> Lista todas as tarefas do usuário passado no token de autenticação

+ **DELETE** - /task/remove

> Remove uma tarefa 

> Espera receber um campo do tipo Query Param de nome taskId

+ **PUT** - /task/edit
> Faz alterações na tarefa
```
 taskId *
 title
 content
 latitude
 longitude
 date
 isDone
```

### USUÁRIO
+ **POST** - /users/add

> Adiciona um novo usuário

> Espera receber um JSON contendo os campos

```
 name *
 email *
 password *
 avatar
```

### AUTENTICAÇÃO
+ **POST** - /auth

> Realiza login do usuário e retorna um token que autoriza o uso do webservice

> Espera receber um JSON contendo os campos

```
 email *
 password *
```

> O token de autorização deve ser enviado no cabeçalho de todas requisições, exceto **/auth** e **/users/add**, pelo campo Authorization
