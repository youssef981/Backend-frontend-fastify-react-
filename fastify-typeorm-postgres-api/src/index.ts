import "reflect-metadata";
import * as dotenv from "dotenv";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { configureRoutes } from "./routes/movies.routes";
import { configureDatabase } from "./db.config";

dotenv.config();

async function startServer() {
  const server = Fastify({
    logger: true, // Enable logging for better debugging (optional)
  }).withTypeProvider<TypeBoxTypeProvider>();

  // Register the CORS plugin
  server.register(cors, {
    origin: process.env.NODE_ENV === "production" 
      ? ["http://localhost:3000/"] // Production origins
      : "*",  // Allow all origins in development
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials if needed in production
  });

  // Configure your database connection
  configureDatabase(server);

  // Configure your routes
  configureRoutes(server);

  // Get the port from environment variables or use a default
  const PORT = parseInt(process.env.PORT || "19200", 10);

  try {
    // Start the server
    const address = await server.listen({ port: PORT });
    console.log(`Server listening on ${address}`);
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1); // Exit with an error code
  }
}

startServer();
