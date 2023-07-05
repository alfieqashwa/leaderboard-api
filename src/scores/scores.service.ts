import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ScoresService {
  constructor(private prisma: PrismaService) { }

  async updateScore(id: number, score: number) {
    return await this.prisma.user.update({
      where: { id },
      data: { score }
    })
  }
}
