#!/bin/bash

# Parar e remover containers existentes
docker-compose down

# Construir e iniciar os containers
docker-compose up --build -d db
echo "Aguardando o MongoDB iniciar..."
sleep 5

docker-compose up --build -d backend
echo "Backend iniciado em http://localhost:8080"
echo "Swagger UI disponível em http://localhost:8080/swagger-ui.html" 