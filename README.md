# API de Usuários

Esta é uma API de gerenciamento de usuários construída com **NestJS**. Ela permite criar e listar usuários, utilizando **Swagger** para documentação da API e **class-validator** para validação dos dados.

## Funcionalidades

- **Criar um usuário**: Através de um endpoint `POST` que aceita dados do usuário e valida as informações.
- **Listar todos os usuários**: Endpoint `GET` que retorna todos os usuários cadastrados.

## Tecnologias Utilizadas

- **NestJS**: Framework para Node.js para construção da API.
- **Swagger**: Para gerar e documentar a API.
- **class-validator**: Para validar os dados de entrada.
- **TypeScript**: Para garantir maior segurança e tipagem estática.

## Como Rodar

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn** (gerenciadores de pacotes)

### Passos

1. Clone o repositório:

    ```bash
    git clone <URL_DO_REPOSITORIO>
    cd <NOME_DO_DIRETORIO>
    ```

2. Instale as dependências:

    Usando **npm**:

    ```bash
    npm install
    ```

    Ou usando **yarn**:

    ```bash
    yarn install
    ```

3. Configure a variável de ambiente `PORT` no seu arquivo `.env` (opcional):

    ```env
    PORT=3000
    ```

    Se não definir, a aplicação rodará na porta 3000 por padrão.

4. Rode a aplicação:

    Usando **npm**:

    ```bash
    npm run start
    ```

    Ou usando **yarn**:

    ```bash
    yarn start
    ```

5. Acesse a API em:  
   `http://localhost:3000/` (ou na porta configurada).

6. Acesse a documentação Swagger em:  
   `http://localhost:3000/api`

## Endpoints

### `POST /usuarios`

Cria um novo usuário.

**Body** (JSON):

```json
{
  "nome": "Nome do Usuário",
  "email": "usuario@dominio.com",
  "senha": "senhaSegura123"
}
