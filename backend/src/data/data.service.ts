import { Injectable } from "@nestjs/common";
import { DataRepository } from "src/data-access/data.repository";

@Injectable()
export class DataService {
  constructor(
    private dataRepository: DataRepository
  ) { }

    async getEnumValues(enumTypeName: string): Promise<string[]> {
      return this.dataRepository.getEnumValues(enumTypeName);
    }
}