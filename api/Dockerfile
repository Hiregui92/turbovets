# Imagen base
FROM node:20

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y tsconfig
COPY package*.json tsconfig.json ./

# Instalar dependencias
RUN npm install

# Copiar el código
COPY src ./src

# Compilar TypeScript
RUN npm run build

# Exponer puerto
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "dist/main.js"]

