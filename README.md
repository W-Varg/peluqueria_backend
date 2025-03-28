# 🚀 Proyecto Peluquería Bella - Backend

Sistema de gestión para peluquerías desarrollado con NestJS, Prisma y PostgreSQL. Incluye módulos para reservas, empleados, sucursales, clientes y servicios.

## 📋 Requisitos Previos

- Node.js v20.9+
- npm v9+ o yarn
- sqlite3

## 🛠 Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/W-Varg/peluqueria_backend.git
   cd peluqueria-bella-backend
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configurar variables de entorno**

   Crear un archivo `.env` en la raíz del proyecto basado en `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Editar el archivo `.env` con tus credenciales:

   ```env
      DATABASE_URL="file:./dev.db"
      JWT_SECRET=tu_clave_secreta_jwt_muy_segura

   ```

   **Generar cliente de Prisma**

   ```bash
   npx prisma generate
   # o
   yarn prisma generate
   ```

## 🚀 Ejecutar la Aplicación

- Para desarrollo (con hot-reload):

  ```bash
  npm run start:dev
  # o
  yarn start:dev
  ```

- Para producción:

  ```bash
  npm run build
  npm run start:prod
  # o
  yarn build
  yarn start:prod
  ```

## 📦 Scripts Disponibles

| Comando         | Descripción                        |
| --------------- | ---------------------------------- |
| start           | Inicia la app en producción        |
| start:dev       | Inicia en modo desarrollo (watch)  |
| build           | Compila el proyecto                |
| test            | Ejecuta tests                      |
| test:watch      | Ejecuta tests en watch mode        |
| test:cov        | Ejecuta tests con cobertura        |
| lint            | Ejecuta linter                     |
| format          | Formatea el código                 |
| prisma:migrate  | Ejecuta migraciones                |
| prisma:studio   | Abre Prisma Studio                 |
| prisma:generate | Genera cliente Prisma              |
| prisma:seed     | Ejecuta seeder de la base de datos |

## 🌐 Endpoints Principales

La aplicación estará disponible en [http://localhost:3001](http://localhost:3001) por defecto.

- **API Docs (Swagger):** [http://localhost:3001/api](http://localhost:3001/api)

## Aceptación de peticiones CORS

el bakend actualmente acepta peticiones de origen cruzado desde `http://localhost:5173/`


## credenciales de acceso

- **Email**: admin@gmail.com
- **contraseña**: Admin123@

## 🧑‍💻 Estructura del Proyecto

```plaintext
src/
├── auth/               # Autenticación JWT
├── modules/
│   ├── empleados/          # Módulo de empleados
│   └── sucursales/         # Módulo de sucursales
├── database/             # Configuración de Prisma
├── app.module.ts       # Módulo principal
└── main.ts             # Punto de entrada
```

## 🛡️ Roles y Accesos

- **ADMIN:** Acceso completo
- **EMPLEADO:** Gestión de reservas propias
- **CLIENTE:** Autogestión de reservas
