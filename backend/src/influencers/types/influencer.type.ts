import { User } from "generated/prisma/client";


export type CreateInfluencer = Omit<User, "id">;