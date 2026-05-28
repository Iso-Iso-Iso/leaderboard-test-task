import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { PrismaService } from '../shared/prisma/prisma.service';
import { seeder } from '../seeders/leaderboard.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const prisma = app.get(PrismaService);

  for (let i = 0; i < 200; i++) {
    const data = seeder();
    await prisma.leaderboardPosition.upsert({
      where: { userName: data.userName },
      update: {},
      create: data,
    });
  }

  console.log('Successfully seeded 200 records.');
  await app.close();
}

bootstrap();
