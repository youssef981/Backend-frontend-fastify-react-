"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureDatabase = void 0;
var typeorm_fastify_plugin_1 = require("typeorm-fastify-plugin");
var Hotels_entity_1 = require("./database/entity/Hotels.entity");
function configureDatabase(server) {
    server.register(typeorm_fastify_plugin_1.default, {
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
        entities: [Hotels_entity_1.Hotel], // Changed from Movie to Hotel
    });
}
exports.configureDatabase = configureDatabase;
