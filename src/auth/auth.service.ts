import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }
  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password)

      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          hash
        }
      })

      return this.signToken(user.id, user.name)

    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError
      ) {
        if (err.code === "P2002") {
          throw new ForbiddenException(
            'Credentials taken'
          )
        }
      }
      throw err
    }
  }
  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { name: dto.name }
    })

    if (!user) throw new ForbiddenException('Credentials incorrect')

    //* compare passwd
    const isPasswdMatch = await argon.verify(
      user.hash,
      dto.password
    )

    if (!isPasswdMatch) throw new ForbiddenException("Credentials is incorrect")

    return this.signToken(user.id, user.name)
  }

  async signToken(userId: number, name: string): Promise<{ access_token: string }> {

    const payload = {
      sub: userId,
      name
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