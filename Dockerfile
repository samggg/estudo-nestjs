# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /app

# Instala apenas dependências necessárias
COPY package*.json ./
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Gera Prisma Client (ignora erro)
RUN npx prisma generate || true

# Build do NestJS
RUN npm run build

# Etapa 2: Imagem final para produção
FROM node:18-alpine

WORKDIR /app

# Copia apenas o necessário para rodar
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Exponha a porta
EXPOSE 3000

CMD ["node", "dist/main.js"]
