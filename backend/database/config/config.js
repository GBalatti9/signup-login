require('dotenv').config();

module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "register-login-p",
    "host": "127.0.0.1",
    "port": 3307,
    "dialect": "mysql",
    dialectModule: require('mysql2'),
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "port": process.env.PORT,
    "dialect": "mysql"
  }
}
