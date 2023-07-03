import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ScoresModule } from './scores/scores.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, UserModule, LeaderboardModule, ScoresModule],
})
export class AppModule { }
