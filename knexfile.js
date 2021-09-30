// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/data.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations',
    },
  },
  production: {
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'mysql',
      database: 'test',
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'migrations',
    },
  },
};
