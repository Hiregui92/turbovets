FROM node:20-alpine

WORKDIR /app

# Instalar Angular CLI globalmente
RUN npm install -g @angular/cli@17

# Exponer puerto de Angular
EXPOSE 4200

# Comando por defecto para desarrollo con live reload
# CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "2000"]
ENTRYPOINT ["sh", "-c", "npm install --legacy-peer-deps && ng serve --host 0.0.0.0 --poll 2000"]

