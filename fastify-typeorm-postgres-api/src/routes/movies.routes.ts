import { FastifyInstance } from "fastify";
import { HotelType } from "../lib/types"; // Assuming HotelType is defined elsewhere
import { Hotel } from "../database/entity/Hotels.entity";
import { IQuerystring, IReply, IdeleteReply } from "../lib/interfaces";

export function configureRoutes(server: FastifyInstance) {
  server.get<{ Reply: IReply }>("/", async (request, reply) => {
    const hotelRepository = server.orm["typeorm"].getRepository(Hotel);
    const hotels = await hotelRepository.find();
    reply.code(200).send({ success: true, data: { hotels } });
  });

  server.post<{ Body: HotelType; Reply: IReply }>(
    "/api/hotels",
    {
      preValidation: (request, reply, done) => {
        const { name, description, urlImage } = request.body;
        done(
          name.length < 2
            ? new Error("Name must be more than 2 characters")
            : undefined
        );
      },
    },
    async (request, reply) => {
      const { name, description, urlImage } = request.body;
      try {
        const hotel = new Hotel();
        hotel.name = name;
        hotel.description = description;
        hotel.urlImage = urlImage;
        const hotelRepository = server.orm["typeorm"].getRepository(Hotel);
        const result = await hotelRepository.save(hotel);
        reply.status(201).send({
          success: true,
          data: {
            hotels: [result],
          },
        });
      } catch (error) {
        reply.code(400).send({ error: error as string });
      }
    }
  );

  server.get<{ Querystring: IQuerystring; Reply: IReply }>(
    "/api/hotels",
    {
      preValidation: (request, reply, done) => {
        const { id } = request.query;
        done(
          id === "" || undefined
            ? new Error("Please provide the id")
            : undefined
        );
      },
    },
    async (request, reply) => {
      try {
        const { id } = request.query;
        const hotelRepository = server.orm["typeorm"].getRepository(Hotel);
        const hotel = await hotelRepository.findOne({ where: { id } });
        if (!hotel) {
          reply.code(404).send({ error: "Hotel not found" });
        } else {
          reply.code(200).send({
            success: true,
            data: {
              hotels: [hotel],
            },
          });
        }
      } catch (error) {
        reply.code(400).send({ error: error as string });
      }
    }
  );

  server.delete<{ Querystring: IQuerystring; Reply: IdeleteReply }>(
    "/api/hotels",
    async (request, reply) => {
      const { id } = request.query;
      const hotelRepository = server.orm["typeorm"].getRepository(Hotel);
      const hotel = await hotelRepository.findOne({ where: { id } });
      if (!hotel) {
        reply.code(404).send({ error: "Hotel not found" });
      } else {
        await hotelRepository.remove(hotel);
        reply.code(200).send({ success: true });
      }
    }
  );

  server.put<{ Querystring: IQuerystring; Body: HotelType; Reply: IReply }>(
    "/api/hotels",
    async (request, reply) => {
      const { id } = request.query;
      const { name, description, urlImage } = request.body;
      const hotelRepository = server.orm["typeorm"].getRepository(Hotel);
      const hotel = await hotelRepository.findOne({ where: { id } });
      if (!hotel) {
        reply.code(404).send({ error: "Hotel not found" });
      } else {
        hotel.name = name;
        hotel.description = description;
        hotel.urlImage = urlImage;
        await hotelRepository.save(hotel);
        reply.code(200).send({
          success: true,
          data: {
            hotels: [hotel],
          },
        });
      }
    }
  );
}
