import { Body, Controller, ForbiddenException, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private scoresService: ScoresService) { }

  @Patch(":id")
  @UseGuards(AuthGuard("jwt"))
  async updateScore(@Param("id") id: string, @Body("score") score: string, @GetUser() user: User) {
    const { isAdmin } = user

    // Authorization check
    if (user.id !== +id && !isAdmin) {
      throw new ForbiddenException('You are not authorized to submit scores for other players.');
    }
    return this.scoresService.updateScore(+id, +score);
  }

}
