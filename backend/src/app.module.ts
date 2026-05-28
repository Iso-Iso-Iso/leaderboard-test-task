import { Module } from '@nestjs/common';
import { PrismaModule } from './shared/prisma/prisma.module';
import { LeaderboardModule } from './modules/leaderboard/leaderboard.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    LeaderboardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
