const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "vastragrah.cbeey2gigm16.ap-south-1.rds.amazonaws.com",
  port: 5432,
  username: "vipanchi",
  password: "Vipanchi786",
  database: "postgres",
  entities: [
    "dist/models/*.js",
  ],
  migrations: [
    "dist/migrations/*.js",
  ],
  ssl: {
    rejectUnauthorized: false, // This is equivalent to sslmode=no-verify
  },
});

module.exports = {
  datasource: AppDataSource,
};
