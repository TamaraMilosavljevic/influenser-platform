import { Module } from "@nestjs/common";
import { InfluencersService } from "./influencers.service";
import { InfluencersController } from "./influencers.controller";
import { DataAccessModule } from "src/data-access/data-access.module";

@Module({
  imports: [DataAccessModule],
  controllers: [InfluencersController],
  providers: [InfluencersService],
})
export class InfluencersModule {}
