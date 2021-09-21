### en mysqlq
- cargar knexfile.js --> la configuracion de tu usario , base de dato ,... y puerto.
- Primero crear la la db en consola mysql (en este casa se dede llamar test en base al archivo knexfile.js)
- Luego ejecutar en la raiz del proyecto: "npx knex migrate:latest --env production" --> aca se crearian toda lastablas
- para empersare el proyecto en modo produccion --> npm start

### en sqllite
- para crear tablas (una sola vez deberian estar creadas) --> "npx knex migrate:latest"
- iniciaro npm run dev 
