import { DataSource } from "typeorm";

export const MyDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: null,
  database: "project-web",
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/entities/*.ts"],
  logging: true,
  synchronize: false,
  migrationsRun: false,
});

MyDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
