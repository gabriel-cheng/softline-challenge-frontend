# ---- Etapa 1: Build ----
FROM node:20-alpine AS build

WORKDIR /app

# Copia arquivos de dependências primeiro (melhora cache do Docker)
COPY package*.json ./

RUN npm ci

# Copia o restante do código-fonte
COPY . .

# Recebe variáveis de ambiente do Vite via build arg e as expõe ao processo de build
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Gera o build de produção (saída padrão do Vite: /app/dist)
RUN npm run build

# ---- Etapa 2: Servir com Nginx ----
FROM nginx:1.27-alpine AS production

# Remove config padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos estáticos gerados pelo build
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuração customizada do Nginx (suporte a SPA/React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]