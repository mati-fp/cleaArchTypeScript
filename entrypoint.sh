#!/bin/sh

# Instalar dependências
npm install

chown -R $(whoami):$(whoami) /app

# Manter o container ativo
tail -f /dev/null
