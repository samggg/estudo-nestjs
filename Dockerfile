# Dockerfile

# Etapa 1: Imagem base com Node.js
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Gerar Prisma Client
RUN npx prisma generate || true


# Build da aplicação NestJS
RUN npm run build

# Expor a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
