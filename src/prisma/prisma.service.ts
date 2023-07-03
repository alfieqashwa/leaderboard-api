import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          // TODO: setup env config, that's find if it expose on git for now
          url: "postgresql://postgres:passwd@localhost:5434/nest-leaderboard?schema=public"
        }
      }
    })
  }
}
