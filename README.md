Desde `api` y desde `client` realizar:

```
npm i
```

para instalar las dependencias necesarias para levantar el Back-end y el Front-end respectivamente.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres.

Una vez completado esto, desde `api` y desde `client`, en dos consolas distintas, correr el siguiente código para levantar Back y Front:

```
npm start
```