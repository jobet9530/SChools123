const Sequelize = require("sequelize");
const config = require("./config").db;
const util = require("util");

module.exports.db = new Sequelize({
  dialect: "sqlite",
  storage: "./db/school.db",
  define: {
    timestamps: false,
    freezeTableName: true,
  },
  quoteIdentifiers: false,
  logging: false,
  timezone: "+08:00",
  dialectOptions: {
    typeCase: util.formatData.bind(util),
  },
});
