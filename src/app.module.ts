import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ScoresModule } from './scores/scores.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, LeaderboardModule, ScoresModule, PrismaModule],
})
export class AppModule { }
