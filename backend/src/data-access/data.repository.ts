import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Injectable()
export class DataRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getEnumValues(enumType: string): Promise<string[]> {

  const rows = await this.prisma.$queryRaw<Array<{ value: string }>>`
    SELECT e.enumlabel AS value
    FROM pg_type t
    JOIN pg_enum e ON t.oid = e.enumtypid
    WHERE t.typname = ${enumType}
    ORDER BY e.enumsortorder;
  `;

  return rows.map(r => r.value);
}

}
