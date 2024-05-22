import { Static, Type } from "@sinclair/typebox";

export const Hotel = Type.Object({
  name: Type.String(),
  description: Type.String(),
  urlImage: Type.String(),
});

export type HotelType = Static<typeof Hotel>;
