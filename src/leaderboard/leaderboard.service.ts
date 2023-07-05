import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LeaderboardService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    try {

      return await this.prisma.user.findMany({
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          email: true,
          name: true,
          score: true,
          isAdmin: true,
        },
        orderBy: { score: "desc" }
      })

    } catch (err) {
      console.error(err);

    }
  }
}
