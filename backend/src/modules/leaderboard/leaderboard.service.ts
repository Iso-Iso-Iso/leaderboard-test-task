import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { LeaderboardUpsertDto } from './leaderboard.dto';

@Injectable()
export class LeaderboardService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({ page = 1, limit = 10 }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.leaderboardPosition.findMany({
        skip,
        take: limit,
        orderBy: { value: 'desc' },
      }),
      this.prisma.leaderboardPosition.count(),
    ]);

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
