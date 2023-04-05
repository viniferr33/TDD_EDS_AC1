# TDD - Engenharia de Software - Ac1

## Instalação

Para instalar as dependências deste projeto, certifique-se de que possui o Node.js e o npm (ou yarn) instalados em sua máquina e execute o seguinte comando na raiz do projeto:

```sh
npm install
```

Para que o Jest funcione corretamente, é necessario que a versão do node seja > 14.0.0
Para verificar a versão:
```sh
node --version
```

Para atualizar o Node:
https://www.freecodecamp.org/news/how-to-update-node-and-npm-to-the-latest-version/

## Testes

Cada etapa dos testes esta em uma Branch Especifica, para executa-las:

### Red

```sh
git checkout red
npm test
```

### Green
```sh
git checkout green
npm test
```

### Refactor
```sh
git checkout refactor
npm test
```

## User Story
EU como Aluno QUERO poder cadastrar minhas informações (nome, telefone, email e senha) PARA usar as funcionalidades do aplicativo

## BDD

### Cenário 1: Cadastro feito com sucesso

Dado que o Aluno não está cadastrado no sistema
E o aluno esta na tela de cadastro
Quando a entrada de Email, senha, nome e telefone.
E o email inserido for considerado valido
E o email inserido não existir no banco de usuarios
E a senha inserida for considerada valida
Então o aluno deve ser receber uma mensagem de sucesso
E o aluno deve ser redirecionado para a tela de login

### Cenário 2: O cadastro não foi feito - Os campos não fora preenchidos corretamente
Dado que o Aluno não está cadastrado no sistema
E o aluno esta na tela de cadastro
Quando a entrada de Email e/ou senha e/ou nome e/ou telefone.
E o email inserido for considerado invalido
OU a senha inserida for considerada invalida
Então o aluno deve ser receber uma mensagem de erro
E a mensagem deve especificar o motivo do erro (campo errado)

### Cenário 3: O cadastro não foi feito - Email de Usuario ja existe

Dado que o Aluno não está cadastrado no sistema
E o aluno esta na tela de cadastro
Quando a entrada de Email, senha, nome e telefone.
E o email inserido for considerado valido
E o email inserido existir no banco de usuarios
Então o aluno deve ser receber uma mensagem de erro (usuario ja existe)
E o aluno deve ser redirecionado para a tela de login
