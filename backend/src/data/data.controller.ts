import { Controller, Get, InternalServerErrorException, Query } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { DataService } from "./data.service";
import { console } from "inspector";

@ApiTags("Data")
@Controller("data")
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @ApiOperation({
    summary: "Get enum values",
    description: "Returns enum values for a given Postgres enum type name.",
  })
  @ApiQuery({
    name: "enumType",
    required: true,
    type: String,
    example: "Role",
  })
  @ApiOkResponse({
    description: "Successfully retrieved",
    schema: { type: "array", items: { type: "string" } },
  })

@Get()
getEnumValues(@Query("enumType") enumType: string) {
  console.log("Received request for enum values of type:", enumType);

  try {
    return this.dataService.getEnumValues(enumType);
  } catch (err) {
    console.error("[DataController] getEnumValues failed:", err);
    throw new InternalServerErrorException("Failed to fetch enum values");
  }
}

}
