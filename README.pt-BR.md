# Projeto MyTrello

[🇧🇷 Português](README.pt-BR.md) | [🇺🇸 English](README.md)

Uma aplicação de gerenciamento de tarefas estilo Trello construída com Spring Boot e React.

## Estrutura do Projeto

```
mytrello/
├── backend/                      # Backend Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── mytrello/
│   │   │   │           ├── controller/    # Controladores REST
│   │   │   │           ├── dto/           # Objetos de Transferência de Dados
│   │   │   │           ├── model/         # Modelos de Domínio
│   │   │   │           ├── repository/    # Camada de Acesso a Dados
│   │   │   │           ├── service/       # Lógica de Negócios
│   │   │   │           └── MyTrelloApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties # Configurações da Aplicação
│   └── pom.xml                  # Dependências Maven
├── frontend/                    # Frontend React
└── docker-compose.yml          # Configuração Docker
```

## Arquitetura

A aplicação segue um padrão de arquitetura em camadas com clara separação de responsabilidades:

### Arquitetura do Backend

![Arquitetura do Backend](docs/uml/uml.png)

O diagrama UML acima mostra os principais componentes do sistema:

1. **Camada de Modelo**: Contém as entidades de domínio
   - `Board`: Representa um quadro Kanban
   - `Column`: Representa uma coluna dentro de um quadro
   - `Card`: Representa um cartão de tarefa dentro de uma coluna

2. **Camada DTO**: Objetos de Transferência de Dados para manipulação de requisições/respostas
   - Cada entidade possui DTOs correspondentes para:
     - Request: Validação de entrada
     - Update: Atualizações parciais
     - Response: Respostas da API

3. **Camada de Repositório**: Interfaces de acesso a dados
   - Estende repositórios MongoDB
   - Fornece métodos de consulta personalizados
   - Gerencia operações de banco de dados

4. **Camada de Serviço**: Implementação da lógica de negócios
   - Implementa regras de negócio
   - Gerencia transformação de dados
   - Controla transações

5. **Camada de Controlador**: Endpoints da API REST
   - Manipula requisições HTTP
   - Gerencia validação de entrada
   - Retorna respostas HTTP apropriadas

### Relacionamentos
- Um Board contém múltiplas Columns (1:N)
- Uma Column contém múltiplos Cards (1:N)
- Services utilizam Repositories para acesso a dados
- Controllers utilizam Services para lógica de negócios
- DTOs mapeiam de e para entidades de domínio

## Stack Tecnológica

### Backend
- Java 17
- Spring Boot 3.2.3
- Spring Data MongoDB
- Spring Validation
- Lombok
- Maven

### Frontend
- React
- Material-UI
- Axios

### Banco de Dados
- MongoDB

## Configuração e Execução

### Pré-requisitos
- Java 17
- Maven
- Docker e Docker Compose
- Node.js e npm

### Executando a Aplicação

1. **Iniciar o Banco de Dados e Serviços**
```bash
docker-compose up -d
```

2. **Compilar e Executar o Backend**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
O backend estará disponível em http://localhost:5000

3. **Compilar e Executar o Frontend**
```bash
cd frontend
npm install
npm start
```
O frontend estará disponível em http://localhost:3000

## Endpoints da API

### Colunas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/columns/{id}` | Obter uma coluna por ID |
| GET | `/api/columns/board/{boardId}` | Obter todas as colunas de um quadro |
| POST | `/api/columns` | Criar uma nova coluna |
| PUT | `/api/columns/{id}` | Atualizar uma coluna |
| DELETE | `/api/columns/{id}` | Excluir uma coluna |

### Exemplos de Requisição/Resposta

#### Criar Coluna
```json
POST /api/columns
{
  "title": "A Fazer",
  "boardId": "board123",
  "order": 1
}
```

#### Atualizar Coluna
```json
PUT /api/columns/{id}
{
  "title": "Em Andamento",
  "order": 2
}
```

## Configuração

### Configuração do Backend (application.properties)
```properties
server.port=5000
spring.data.mongodb.host=mongodb
spring.data.mongodb.port=27017
spring.data.mongodb.database=mytrello
```

### Configuração do Frontend
O frontend está configurado para se conectar à API do backend em `http://localhost:5000/api`

## Desenvolvimento

### Adicionando Novos Recursos
1. Criar a classe de modelo em `backend/src/main/java/com/mytrello/model`
2. Criar DTOs em `backend/src/main/java/com/mytrello/dto`
3. Criar a interface do repositório em `backend/src/main/java/com/mytrello/repository`
4. Implementar a camada de serviço em `backend/src/main/java/com/mytrello/service`
5. Criar o controlador em `backend/src/main/java/com/mytrello/controller`

### Padrões de Código
- Usar convenções de nomenclatura Java apropriadas
- Seguir as melhores práticas de API REST
- Implementar validação e tratamento de erros adequados
- Usar DTOs para manipulação de requisições/respostas
- Documentar novos endpoints e funcionalidades

## Tratamento de Erros
A aplicação implementa tratamento de erros adequado:
- Erros de validação retornam 400 Bad Request
- Erros de não encontrado retornam 404 Not Found
- Erros de servidor retornam 500 Internal Server Error

## Segurança
- CORS está configurado para permitir requisições do frontend
- Validação de entrada é implementada usando Jakarta Validation
- Mensagens de erro apropriadas são retornadas sem expor detalhes internos 