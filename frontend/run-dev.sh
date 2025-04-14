#!/bin/bash

# Construir e iniciar o container do frontend
docker-compose up --build -d frontend

echo "Frontend iniciado em http://localhost:3000" 