# Utiliza uma imagem leve do Node.js
FROM node:16-alpine

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY . .

# Instala o http-server globalmente para servir os arquivos estáticos
RUN npm install -g http-server

# Expõe a porta que o servidor usará
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["http-server", "-p", "8080"]