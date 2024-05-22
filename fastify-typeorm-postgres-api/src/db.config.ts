import plugin from "typeorm-fastify-plugin";
import { Hotel } from "./database/entity/Hotels.entity";
import { FastifyInstance } from "fastify";

export function configureDatabase(server: FastifyInstance) {
  server.register(plugin, {
    namespace: "typeorm",
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.NODE_ENV === "dev",
    logging: process.env.NODE_ENV === "dev",
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
    migrationsRun: process.env.NODE_ENV !== "dev",
    entities: [Hotel], // Changed from Movie to Hotel
  });
}
