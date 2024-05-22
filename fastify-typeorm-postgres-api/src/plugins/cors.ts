import fastifyPlugin from "fastify-plugin";
import cors from "@fastify/cors";

async function corsPlugin(fastify: any, opts: any) {
  fastify.register(cors, {
    origin: "*", // Replace with your allowed origins in production
  });
}

export default fastifyPlugin(corsPlugin);
