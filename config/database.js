const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("\n\nDatabase Connected Successfully");
  } catch (error) {
    console.log("\n\n Error connecting Database : " + error);
  }
};

testDatabaseConnection();

module.exports = { sequelize };
