import {
  Controller,
  Get,
  Patch,
  Body,
  Query,
  UsePipes,
  ParseIntPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { LeaderboardService } from './leaderboard.service';
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe';
import {
  leaderboardUpsertSchema,
  LeaderboardUpsertDto,
  SortOrder,
} from './leaderboard.dto';
import { IdempotencyPipe } from '../../pipes/idempotency.pipe';

@Controller('api/leaderboard')
export class LeaderboardController {
  constructor(private readonly leaderboardService: LeaderboardService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
    @Query('sort', new ParseEnumPipe(SortOrder, { optional: true }))
    sort: SortOrder = SortOrder.DESC,
  ) {
    return this.leaderboardService.findAll({
      page,
      limit,
      sort,
    });
  }

  @Patch('rewrite')
  @UsePipes(new ZodValidationPipe(leaderboardUpsertSchema), IdempotencyPipe)
  async createOrRewrite(@Body() body: LeaderboardUpsertDto) {
    return this.leaderboardService.createOrRewrite(body);
  }

  @Patch('append')
  @UsePipes(new ZodValidationPipe(leaderboardUpsertSchema), IdempotencyPipe)
  async incrementOrCreate(@Body() body: LeaderboardUpsertDto) {
    return this.leaderboardService.incrementOrCreate(body);
  }
}
