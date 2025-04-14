# MyTrello

Um clone do Trello desenvolvido como projeto de estudo, permitindo gerenciamento de quadros, colunas e cards.

## 🚀 Status do Projeto

**Em Desenvolvimento** - O projeto está em fase de desenvolvimento ativo. Novas funcionalidades estão sendo adicionadas regularmente.

## 📋 Funcionalidades Implementadas

### Backend
- ✅ Gerenciamento de Boards (Quadros)
- ✅ Gerenciamento de Columns (Colunas)
- ✅ Gerenciamento de Cards
- ✅ Autenticação Básica
- ✅ API RESTful
- ✅ Documentação Swagger
- ✅ Integração com MongoDB
- ✅ Health Check e Monitoramento

### Próximas Funcionalidades
- [ ] Sistema de Usuários
- [ ] Etiquetas (Labels)
- [ ] Comentários
- [ ] Listas de Verificação
- [ ] Anexos
- [ ] Histórico de Atividades
- [ ] Interface Web

## 🛠️ Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3.2.3
- Spring Data MongoDB
- Spring Security
- Spring Actuator
- Swagger/OpenAPI
- MongoDB
- Docker
- Maven

## 📦 Estrutura do Projeto

```
mytrello/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/mytrello/
│   │   │   │       ├── config/
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       └── service/
│   │   │   └── resources/
│   │   └── test/
│   ├── Dockerfile
│   └── docker-compose.yml
└── README.md
```

## 🔧 Configuração do Ambiente

### Pré-requisitos
- Java 17
- Maven
- Docker
- Docker Compose

### Executando Localmente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/mytrello.git
cd mytrello/backend
```

2. Execute com Maven:
```bash
mvn spring-boot:run -Dspring.profiles.active=dev
```

### Executando com Docker

1. Na pasta do backend:
```bash
docker-compose up --build
```

2. Acesse:
- API: http://localhost:5000/api
- Swagger UI: http://localhost:5000/swagger-ui.html
- Health Check: http://localhost:5000/actuator/health

## 📝 Documentação da API

A documentação completa da API está disponível através do Swagger UI em:
http://localhost:5000/swagger-ui.html

### Endpoints Principais

#### Boards
- `GET /api/boards` - Listar todos os boards
- `POST /api/boards` - Criar novo board
- `GET /api/boards/{id}` - Buscar board específico
- `PUT /api/boards/{id}` - Atualizar board
- `DELETE /api/boards/{id}` - Remover board

#### Columns
- `GET /api/columns` - Listar todas as colunas
- `POST /api/columns` - Criar nova coluna
- `GET /api/columns/{id}` - Buscar coluna específica
- `PUT /api/columns/{id}` - Atualizar coluna
- `DELETE /api/columns/{id}` - Remover coluna

#### Cards
- `GET /api/cards` - Listar todos os cards
- `POST /api/cards` - Criar novo card
- `GET /api/cards/{id}` - Buscar card específico
- `PUT /api/cards/{id}` - Atualizar card
- `DELETE /api/cards/{id}` - Remover card

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📧 Contato

Seu Nome - [@seu-twitter](https://twitter.com/seu-twitter) - email@exemplo.com

Link do Projeto: [https://github.com/seu-usuario/mytrello](https://github.com/seu-usuario/mytrello) 