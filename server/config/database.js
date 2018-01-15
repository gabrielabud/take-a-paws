exports.DBConfig = {

  development: {
    dbName:   "take-a-paws-dev",
    user:     "",
    password: null,
    options: {
      dialect: "postgres",
      port:    3001
    }
  },

  test: {
    dbName:   "take-a-paws-test",
    user:     "",
    password: null,
    options: {
      dialect: "postgres",
      port:    3001
    }
  }

};
