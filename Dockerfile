# Usa uma imagem do Node.js com versão leve
FROM node:20-alpine AS builder

# Define o diretório de trabalho
WORKDIR /app

# Copia arquivos essenciais para instalação das dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o código do projeto
COPY . .


# Gera os arquivos do Prisma Client
RUN npx prisma generate




# Compila a aplicação NestJS para produção
RUN npm run build

# ========================
# Fase final (imagem menor)
# ========================
FROM node:20-alpine

WORKDIR /app

# Copia os arquivos necessários da fase anterior
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma


# Expõe a porta do NestJS
EXPOSE 3000

# Executa as migrations e inicia a aplicação
CMD npx prisma migrate deploy && node dist/main.js
