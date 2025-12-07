import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { CreateInfluencer } from "src/influencers/types/influencer.type";
import { Influencer } from "generated/prisma/client";

@Injectable()
export class InfluencersRepository {
  constructor(private db: PrismaService) {}

  async createInfluencer(data: CreateInfluencer) {
    return this.db.user.create({ data });
  }

  async update(influencerId: string, data: Partial<Influencer>) {
    return this.db.user.update({
      where: { id: influencerId },
      data,
    });
  }
}
