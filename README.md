# API CRUD Games

API desenvolvida durante o curso **[Formação Node.js](https://guiadoprogramador.com/course/index/7/7#_)**.

## Versão atual
1.0.0

## Instalar
```node
    npm install
```
Crie um arquivo *.env*:
```
    # Servidor local
    SERVER_PORT=3001

    # Banco de dados
    DATABASE="nome_do_banco"
    USER_NAME="usuario"
    PASS="senha"
    HOST="localhost"

    # Chave de segurança
    KEY_API="exemple" 
```

## Endpoints:

>## POST /auth
>Este endpoint é responsável por autenticar o usuário da API.
- #### Parâmetros:
    - E-mail e Senha do usuário cadastrado no sistema

        ```json
        {
            "email" : "exemple@exemple.com",
            "password" : "123456"
        }
        ```
- #### Respostas:
    - OK! 200 | Em caso de verdadeiro, você receberá o token *[JWT](https://jwt.io/)* para se autenticar.

        ```json
            {
                "ok": "Usuário autenticado!",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
        ```
    - Não localizado! 404 | Houve uma falha durante o processo de login.
        - Motivos: E-mail e/ou senha incorreta.

        ```json
            {
                "err": "Usuário inválido!"
            }
        ```

>## GET /games
>Este endpoint é responsável por listar todos os games cadastrados no banco de dados.
- #### Parâmetros:
    - Nenhum.
- #### Respostas:
    - OK! 200 | Em caso de verdadeiro, você receberá a listagem de todos os games.

        ```json
        [
            {
                "id": 1,
                "title": "The Last Of Us Part II",
                "year": 2020,
                "price": 149.99,
                "createdAt": "2021-05-29T00:02:35.000Z",
                "updatedAt": "2021-05-29T00:02:35.000Z"
            },
            {
                "id": 2,
                "title": "God of War",
                "year": 2020,
                "price": 149.99,
                "createdAt": "2021-05-29T00:02:47.000Z",
                "updatedAt": "2021-05-29T00:02:47.000Z"
            }
        ]
        ```
    - Falha na autenticação! 401 | Houve uma falha durante o processo de autenticação.
        - Motivos: Token inválodo, Token expirado.
        ```json
            {
                "err": "Token inválido!"
            }
        ```

>## POST /game
>Este endpoint é responsável por listar um game especifico cadastrado no banco de dados.
- #### Parâmetros:
    - Titulo, ano e preço.

        ```json
        {
            "title": "Cyber Punk 2077",
            "year": 2021,
            "price": 249.99
        }
        ```
- #### Respostas:
    - OK! 200 | Em caso de verdadeiro, o game sera cadastrado no banco de dados.
    - Requer autenticação! 407 | Usuário não está autenticado.
        ```json
            {
                "err": "Token inválido!"
            }
        ```
>## GET /game/:id
>Este endpoint é responsável por listar um game especifico cadastrado no banco de dados.

>## PUT /game/:id
>Este endpoint é responsável por editar um game especifico cadastrado no banco de dados.

>## DELETE /game/:id
>Este endpoint é responsável por deletar um game especifico cadastrado no banco de dados.
---

## Créditos
Curso formação Node.Js em https://guiadoprogramador.com/

## Licença
Projeto está sob licença do [MIT]("https://opensource.org/licenses/mit-license.php")

---

Desenvolvido com :heart: por **BrHCastro**.