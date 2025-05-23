# Peluquería Backend

Backend para el sistema de gestión de peluquería desarrollado con NestJS.

## Enlaces del Proyecto

- Frontend: [https://github.com/W-Varg/peluqueria_frontend.git](https://github.com/W-Varg/peluqueria_frontend.git)
- Backend: [https://github.com/W-Varg/peluqueria_backend.git](https://github.com/W-Varg/peluqueria_backend.git)

## Requisitos Mínimos

- Node.js 20.x o superior
- Yarn 1.22.x o superior
- PostgreSQL 15.x
- Prisma ORM

## Tecnologías Principales

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT para autenticación

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/W-Varg/peluqueria_backend.git
cd peluqueria_backend
```

2. Instalar dependencias:
```bash
yarn install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
```
Editar el archivo `.env` con tus configuraciones.

4. Ejecutar migraciones de Prisma:
```bash
yarn prisma migrate dev
```

5. Iniciar el servidor en modo desarrollo:
```bash
yarn start:dev
```

## Scripts Disponibles

- `yarn start:dev`: Inicia el servidor en modo desarrollo
- `yarn build`: Compila el proyecto
- `yarn start:prod`: Inicia el servidor en modo producción
- `yarn test`: Ejecuta los tests
- `yarn prisma:generate`: Genera el cliente Prisma
- `yarn prisma:migrate`: Ejecuta las migraciones de la base de datos

## Estado de Docker Compose

⚠️ **Nota Importante**: Actualmente, la configuración de Docker Compose presenta problemas y no está funcionando correctamente. Se recomienda ejecutar el proyecto localmente siguiendo los pasos de instalación manual mencionados arriba.

Los problemas conocidos incluyen:
- Errores en la generación del cliente Prisma
- Problemas de conexión con la base de datos
- Conflictos con las variables de entorno

Estamos trabajando en resolver estos problemas. Por ahora, se recomienda el desarrollo local.


## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.
