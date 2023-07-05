import { Controller, Get } from '@nestjs/common';
import { Leaderboard } from '@prisma/client';
import { LeaderboardService } from './leaderboard.service';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) { }

  @Get()
  async findAl() {
    return await this.leaderboardService.findAll()
  }
}
