import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { LeaderboardUpsertDto, SortOrder } from './leaderboard.dto';
import { Prisma } from 'src/generated/client';

@Injectable()
export class LeaderboardService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    page = 1,
    limit = 10,
    sort = SortOrder.DESC,
  }: {
    page: number;
    limit: number;
    sort?: SortOrder;
  }) {
    const skip = (page - 1) * limit;

    const orderFragment =
      sort === SortOrder.ASC
        ? Prisma.sql`ORDER BY "value" ASC`
        : Prisma.sql`ORDER BY "value" DESC`;

    const query = this.prisma.$queryRaw<
      { rank: bigint; id: number; value: number; userName: string }[]
    >`
            SELECT id, "userName", "value", ROW_NUMBER() OVER (ORDER BY "value" DESC) AS rank
            FROM "LeaderboardPosition"
            ${orderFragment}
            LIMIT ${limit} OFFSET ${skip}
          `;

    const [rawData, total] = await Promise.all([
      query,
      this.prisma.leaderboardPosition.count(),
    ]);

    const data = rawData.map((item) => ({
      ...item,
      rank: Number(item.rank),
    }));

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async createOrRewrite({ userName, value }: LeaderboardUpsertDto) {
    return this.prisma.leaderboardPosition.upsert({
      where: { userName },
      update: {
        value,
      },
      create: {
        userName,
        value,
      },
    });
  }

  async incrementOrCreate({ userName, value }: LeaderboardUpsertDto) {
    return this.prisma.leaderboardPosition.upsert({
      where: { userName },
      update: {
        value: {
          increment: value,
        },
      },
      create: {
        userName,
        value,
      },
    });
  }
}
