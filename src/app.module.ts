import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LeaderboardModule } from './leaderboard/leaderboard.module';
import { ScoresModule } from './scores/scores.module';

@Module({
  imports: [UserModule, LeaderboardModule, ScoresModule],
  providers: [AppService],
})
export class AppModule { }
