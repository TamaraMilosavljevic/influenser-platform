import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { InfluencersService } from "./influencers.service";
import { CreateInfluencerDto } from "./dto/create-influencer.dto";
import { UpdateInfluencerDto } from "./dto/update-influencer.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InfluencerSchema } from "./schemas/influencer.schema";

@ApiTags("Influencers")
@Controller("influencers")
export class InfluencersController {
  constructor(private readonly influencersService: InfluencersService) {}

  @ApiOperation({
		summary: 'Register a new influencer',
		description:
			'This endpoint creates a new influencer with the provided details.',
	})
	@ApiResponse({
		status: 201,
		description: 'Successfully created',
		content: {
			'application/json': {
				schema: InfluencerSchema
			},
		},
	})
  @Post()
  create(@Body() createInfluencerDto: CreateInfluencerDto) {
    return this.influencersService.create(createInfluencerDto);
  }

  @Get()
  findAll() {
    return this.influencersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.influencersService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateInfluencerDto: UpdateInfluencerDto,
  ) {
    return this.influencersService.update(+id, updateInfluencerDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.influencersService.remove(+id);
  }
}
