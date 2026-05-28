import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Query,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { ZodValidationPipe } from '../../shared/pipes/zod-validation.pipe';
import {
  leaderboardUpsertSchema,
  LeaderboardUpsertDto,
} from './leaderboard.dto';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    return this.leaderboardService.findAll({
      page,
      limit,
    });
  }

  @Post()
  @UsePipes(new ZodValidationPipe(leaderboardUpsertSchema))
  async createOrRewrite(@Body() body: LeaderboardUpsertDto) {
    return this.leaderboardService.createOrRewrite(body);
  }

  @Patch('append')
  @UsePipes(new ZodValidationPipe(leaderboardUpsertSchema))
  async incrementOrCreate(@Body() body: LeaderboardUpsertDto) {
    return this.leaderboardService.incrementOrCreate(body);
  }
}
