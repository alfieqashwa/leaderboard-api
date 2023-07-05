import { Controller, Get, UseGuards } from '@nestjs/common';
import { Leaderboard } from '@prisma/client';
import { LeaderboardService } from './leaderboard.service';
import { JwtGuard } from 'src/auth/guard';

@Controller('leaderboard')
export class LeaderboardController {
  constructor(private leaderboardService: LeaderboardService) { }

  @UseGuards(JwtGuard) // will unauthorized without token
  @Get()
  async findAl() {
    return await this.leaderboardService.findAll()
  }
}
