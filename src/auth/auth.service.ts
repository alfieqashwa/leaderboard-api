import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }
  async signup(dto: AuthDto) {
    try {

      const hash = await argon.hash(dto.password)

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash
        }
      })

      return this.signToken(user.id, user.email)

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

      return this.signToken(user.id, user.email)

    } catch (err) {
      console.error(err);
    }
  }

  async signToken(userId: number, email: string): Promise<{ access_token: string }> {

    const payload = {
      sub: userId,
      email
    }
    const secret = this.config.get("JWT_SECRET")

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "10h",
      secret
    })

    return {
      access_token: token
    }

  }
}