import { ForbiddenException, Injectable } from "@nestjs/common";
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
      //? error code: 'P2002' in terminal,
      console.error(err);

    }
  }
  async signin(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email }
      })

      if (!user) throw new ForbiddenException('Credentialls incorrect')

      //* compare passwd
      const isPasswdMatch = await argon.verify(
        user.hash,
        dto.password
      )

      if (!isPasswdMatch) throw new ForbiddenException("Credentials is incorrect")

      delete user.hash
      return user

    } catch (err) {
      console.error(err);


    }
  }
}