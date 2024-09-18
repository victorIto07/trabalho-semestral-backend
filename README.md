[<img src="./assets/logo.png" alt="Banner projeto">](http://vitu.app.br)

---

<!--toc:start-->
- [Sobre o projeto ℹ️](#sobre-o-projeto-ℹ️)
- [Utilizando o projeto 💻](#utilizando-o-projeto-💻)
- [Informações das rotas 📫](#informações-das-rotas-📫)
  - [Importante ❗](#importante)
  - [Acesso 👤](#acesso-👤)
  - [Contato 📒](#contato-📒)
- [Usabilidade das rotas 🗺️](#usabilidade-das-rotas-🗺️)
  - [Postman 🕺](#postman-🕺)
  - [Acesso 👤](#acesso-👤)
    - [Login 🚪](#login-🚪)
    - [Cadastro 📝](#cadastro-📝)
  - [Contato 📒](#contato-📒)
    - [Listar 👥](#listar-👥)
    - [Obter contato 👤](#obter-contato-👤)
    - [Cadastrar contato ✏️](#cadastrar-contato-️)
    - [Atualizar contato 📎](#atualizar-contato-📎)
    - [Remover contato ❌](#remover-contato)
- [Models do projeto 🔗](#models-do-projeto-🔗)
  - [User 👤](#user-👤)
  - [Contact 📒](#contact-📒)
- [Requisitos do trabalho ✅](#requisitos-do-trabalho)
<!--toc:end-->

# Sobre o projeto ℹ️

Fecafbook é uma aplicação simples que permite aos usuários armazenar e compartilhar contatos em uma plataforma, funcionando como uma agenda pública. Todos os usuários têm acesso para visualizar os contatos cadastrados, mas apenas o criador de um contato específico pode editá-lo ou removê-lo.

A API foi desenvolvida inteiramente em TypeScript, conforme solicitado, e utilizando bibliotecas que considerei necessárias. O frontend foi implementado usando a stack web padrão (HTML, CSS e JS), sem a utilização de frameworks ou pacotes CSS (como Tailwind, Bootstrap, etc.). O banco de dados escolhido foi o MySQL, por ser uma opção leve e familiar.

**Importante sobre o frontend:** por se tratar de um trabalho de frontend, eu não me preocupei em fazer uma interface responsiva. Logo a interface não está preparada para uso mobile, apenas em PC 😉

O projeto está hospedado em uma instância da AWS, incluindo todas as suas dependências e o banco de dados. Caso o banco de dados esteja inacessível, entre em contato pelo e-mail <victor.ito@a.fecaf.com.br>, pois o IP da instância é dinâmico e pode ter sido alterado, o que pode diferir da configuração do DNS.

---

# Utilizando o projeto 💻

## Preparando o frontend 🖼️

#### Por se tratar de um diretório com arquivos HTML estáticos, o frontend precisa de alguma ferramenta para servi-los. Utilize o *live-server* para essa tarefa

```bash
npm install -g live-server
cd frontend
live-server --port=80
```

---

#### No arquivo */frontend/assets/js/servicos.js*, há uma variável chamada *"PREFIXO_ENDPOINT"* na 4ª linha, que define a rota em que as requisições serão efetuadas. Para utilizar a API em localhost, comente a linha onde o endpoint real está sendo utilizado e descomente a linha acima, onde se encontra o link com localhost. Caso contrário, as requisições feitas pela interface não passarão pela sua máquina

## Preparando o backend 🚂

#### A configuração da conexão com o banco de dados é feita utilizando o arquivo .env, localizado em */backend*. Portanto, é necessário iniciar o projeto estando no diretório */backend*. Caso contrário, o projeto não encontrará as configurações necessárias, resultando em erros. Siga as instruções abaixo

```bash
cd backend
npm i
npm run start
```

#### Note que o comando *"npm run start"* utiliza a flag --env-file para informar o arquivo de configuração. Essa flag é uma funcionalidade disponível a partir do Node 20.6.0+. Portanto, não é possível utilizar versões mais antigas do Node, como a 16.x.x ou 12.x.x

---

# Informações das rotas 📫

## Importante ❗

#### Todas as requisições têm o header "Content-Type" sobrepostos para suportar requisições no formato JSON, logo

- não é possível efetuar uma requisição que não seja em JSON;
- não é necessário passar o header "Content-Type" para fazer as requisições pelo curl por exemplo;

## Acesso 👤

As rotas de acesso, identificadas pelo caminho "/access/*", são responsáveis pela autenticação e criação de usuários. Como o projeto requer controle de usuários, essas rotas gerenciam o login e cadastro dos mesmos. Os endpoints retornam os dados do usuário no formato [User](#user-👤), juntamente com o token de autenticação da sessão. Este token deve ser incluído no cabeçalho das requisições para rotas que exijam autenticação.

**Importante:** A autenticação foi implementada manualmente, sem o uso de bibliotecas especializadas. É apenas um hash é armazenado localmente vinculado à uma data de expiração e a um usuário.

## Contato 📒

As rotas de contato, identificadas pelo caminho "/contact/*", são responsáveis pela manipulação dos contatos. Estas rotas exigem autenticação, e sem um token válido no cabeçalho da requisição, retornarão um erro 401 informando que o token é inválido.

---

# Usabilidade das rotas 🗺️

## Postman 🕺

Para facilitar a interação com a API, segue um link do Postman contendo os endpoints mencionados abaixo:

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/14884943-26ee4f66-969c-4ae6-8540-394e272442b0?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D14884943-26ee4f66-969c-4ae6-8540-394e272442b0%26entityType%3Dcollection%26workspaceId%3D5328b4f2-9d93-43a7-a8c9-bdd59591a39b)

## Acesso 👤

### Login 🚪

#### Endpoint: /access/login

#### Método: POST

#### Payload esperado: Email e senha no formato [User](#user-👤)

#### Retorno esperado: Dados do usuário no formato [User](#user-👤) + token de autenticação

```bash
curl http://vitu.app.br:8080/access/login -X POST -d '{"email":"test_mail@mail.com", "password":"test1234"}'
```

```json
{
  "id": "9fc7e87f-9979-4bf0-b18e-351df8c16827",
  "name": "Test",
  "email": "test_mail@mail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

### Cadastro 📝

#### Endpoint: /access/logon

#### Método: POST

#### Payload esperado: Dados do usuário no formato [User](#user-👤)

#### Retorno esperado: Dados do usuário no formato [User](#user-👤) + token de autenticação

```bash
curl http://vitu.app.br:8080/access/logon -X POST -d '{"name":"Test", "email":"test_mail@mail.com", "password":"test1234"}'
```

```json
{
  "id": "9fc7e87f-9979-4bf0-b18e-351df8c16827",
  "name": "Test",
  "email": "test_mail@mail.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}
```

## Contato 📒

### Listar 👥

#### Endpoint: /contact

#### Método: GET

#### Autenticação necessária

#### Retorno esperado: Lista de contatos no formato [Contact](#contact-📒)

```bash
curl http://vitu.app.br:8080/contact -X GET -H "authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
```

```json
[
  {
    "id": "9675a417-f4e1-4ec7-9fb0-4750cab4e47d",
    "name": "Test",
    "phone_number": "123456789",
    "email": "test_mail@mail.com",
    "image_url": "https://example.com/test.jpg"
  },
  {
    "id": "f5b9a5c9-7aef-4c3d-9e7a-7b8f5b9a5c9",
    "name": "Test 2",
    "phone_number": "987654321",
    "email": "test_mail_2@mail.com",
    "image_url": "https://example.com/test2.jpg"
  }
]
```

### Obter contato 👤

#### Endpoint: /contact/:id

#### Método: GET

#### Autenticação necessária

#### Retorno esperado: Contato no formato [Contact](#contact-📒)

```bash
curl http://vitu.app.br:8080/contact/9675a417-f4e1-4ec7-9fb0-4750cab4e47d -X GET -H "authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
```

```json
{
  "id": "9675a417-f4e1-4ec7-9fb0-4750cab4e47d",
  "name": "Test",
  "phone_number": "123456789",
  "email": "test_mail@mail.com",
  "image_url": "https://example.com/test.jpg"
}
```

### Cadastrar contato ✏️

#### Endpoint: /contact

#### Método: POST

#### Autenticação necessária

#### Payload esperado: Contato no formato [Contact](#contact-📒) (o ID será gerado pela API)

#### Retorno esperado: Ok

```bash
curl http://vitu.app.br:8080/contact -X POST -H "authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" -d '{"name":"Test", "phone_number":"123456789", "email":"test_mail@mail.com", "image_url":"https://example.com/test.jpg"}'
```

```json
{
  "ok": true
}
```

### Atualizar contato 📎

#### Endpoint: /contact/:id

#### Método: PUT

#### Autenticação necessária

#### Payload esperado: Contato no formato [Contact](#contact-📒)

#### Retorno esperado: Ok

```bash
curl http://vitu.app.br:8080/contact/9675a417-f4e1-4ec7-9fb0-4750cab4e47d -X PUT -H "authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" -d '{"name":"New Test", "phone_number":"987654321", "email":"test_mail_new@mail.com", "image_url":"https://example.com/new_test.jpg"}'
```

```json
{
  "ok": true
}
```

### Remover contato ❌

#### Endpoint: /contact/:id

#### Método: DELETE

#### Autenticação necessária

#### Retorno esperado: Ok

```bash
curl http://vitu.app.br:8080/contact/9675a417-f4e1-4ec7-9fb0-4750cab4e47d -X DELETE -H "authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
```

```json
{
  "ok": true
}
```

---

# Models do projeto 🔗

## User 👤

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string"
}
```

## Contact 📒

```json
{
  "id": "string",
  "name": "string",
  "phone_number": "string",
  "email": "string",
  "image_url": "string"
}
```

---

# Requisitos do trabalho ✅

- [x] Backend totalmente em TypeScript
- [x] Estrutura definida em camadas (services, routes, controllers...)
- [x] Autenticação
- [x] Documentação da API
- [x] Desenvolvimento de testes para os endpoints e módulos da API
- [x] Interface simples que utilize a API
