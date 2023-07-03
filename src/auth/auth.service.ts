import { Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }
  async signup(dto: AuthDto) {
    try {

      const hash = await argon.hash(dto.password)

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
        }
      })

      delete user.hash //avoid response the hash
      return user

    } catch (err) {
      //TODO: not much time
      console.error(err);

    }

    return {
      test: "am I connected to sign up??"
    }
  }
  signin(dto: AuthDto) {
    return {
      test: "am I connected to sign in??"
    }
  }
}