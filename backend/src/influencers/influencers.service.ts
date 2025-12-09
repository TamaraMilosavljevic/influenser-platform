import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateInfluencerDto } from "./dto/create-influencer.dto";
import { UpdateInfluencerDto } from "./dto/update-influencer.dto";
import { InfluencersRepository } from "src/data-access/influencers.repository";

@Injectable()
export class InfluencersService {
  constructor(private influencersRepository: InfluencersRepository) {}
  create(createInfluencerDto: CreateInfluencerDto) {
    return this.influencersRepository.createInfluencer({
      ...createInfluencerDto,
      role: "INFLUENCER",
    });
  }

  async publish(id: string) {
    try {
      await this.influencersRepository.update(id, { isPrivate: false });
      return { message: "Influencer profile published successfully." };
    } catch (error) {
      throw new InternalServerErrorException("Failed to publish influencer profile.");
    }
  }

  findAll() {
    return `This action returns all influencers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} influencer`;
  }

  update(id: number, updateInfluencerDto: UpdateInfluencerDto) {
    return `This action updates a #${id} influencer`;
  }

  remove(id: number) {
    return `This action removes a #${id} influencer`;
  }
}
