# 🎟️ API Node.js e PostgreSQL

Este é um projeto que tem como objetivo gerenciar um sistema de venda de ingressos para um evento através do Node.js e PostgreSQL.

## Antes de iniciar configure o Ambiente e instale as bibliotecas necessárias:

- **npm install express cors dotenv uuid**

- **npm install nodemon --save-dev**
  
## Dependências:
- `express` → Framework para criar o servidor web
- `cors` → Permite que a API seja acessada por outros domínios
- `dotenv` → Gerencia variáveis de ambiente
- `pg` → Cliente PostgreSQL para Node.js

## Arquivo .env
Crie um arquivo `.env` na raiz do projeto e adicione:
```sh
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=eventos
DB_PASSWORD=sua_senha
DB_PORT=sua_porta
```

## 1 Passo: definir os atributos
- id SERIAL PRIMARY KEY,
- evento VARCHAR(225) NOT NULL,
- local VARCHAR(225) NOT NULL,
- data_evento DATE NOT NULL,
- categoria VARCHAR(50) NOT NULL,
- preco DECIMAL (10,2) NOT NULL,
- quantidade_disponivel INTEGER NOT NULL
  
## 2 Passo: criar o Banco de Dados e adicionar conteúdos na Tabela de Ingressos:
```sql
INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES 
('Show Justin Bieber', 'São Paulo', '2025-11-18', 'Camarote', 300.00, 500),
('Show Justin Bieber', 'São Paulo', '2025-11-18', 'Pista', 100.00, 1000),
('Show Justin Bieber', 'São Paulo', '2025-11-18', 'Pista VIP', 200.00, 700),
('Show Justin Bieber', 'São Paulo', '2025-11-18', 'Arquibancada', 80.00, 900);
```
## 3 passo: Endpoints da API
### Rota GET- Listar Ingressos

- Esta rota será responsável por listar todos os ingressos encontrados no sistema.

**GET** `/tickets`

### Rota GET- Encontrar pelo ID

- Esta rota irá encontrar um ingresso específico baseado em seu ID único fornecido.
  
**GET** `/tickets/:id`

### Rota POST- Cadastrar Ingressos

- Esta rota será responsável por Cadastrar um novo ingresso no sistema.

**POST** `/tickets`

### Rota POST- Venda de Ingressos

- Esta rota será responsável pela venda de ingressos no sistema.

**POST** `/venda`

####  Resposta de Sucesso (HTTP 200)
```json
{
  "mensagem": "Compra realizada com sucesso!",
  "evento": "Show do Justin Bieber",
  "categoria": "Pista",
  "quantidade_comprada": 2,
  "quantidade_restante": 298
}
```

#### Erro por falta de ingressos (HTTP 400)
```json
{
  "erro": "Ingressos insuficientes para a venda."
}
```

### Rota PUT- Atualizar Ingressos

- Esta rota é responsável por atualizar uma informação do ingresso no nosso sistema.

**PUT** `/tickets/:id`

### Rota DELETE- Deletar Ingressos

- Essa rota é responsável por deletar um ingresso do sistema.

**DELETE** `/tickets/:id`




