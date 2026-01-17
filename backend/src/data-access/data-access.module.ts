import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { InfluencersRepository } from "./influencers.repository";
import { UsersRepository } from "./users.repository";
import { BusinessRepository } from "./businesses.repository";
import { DataRepository } from "./data.repository";

@Module({
    providers: [PrismaService, InfluencersRepository, UsersRepository, BusinessRepository, DataRepository],
    exports: [InfluencersRepository, UsersRepository, BusinessRepository, DataRepository],
})
export class DataAccessModule {
}
