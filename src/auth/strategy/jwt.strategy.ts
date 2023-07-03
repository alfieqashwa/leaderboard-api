import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaClient } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";

/**
 * this class is for validating the access token 
 * https://docs.nestjs.com/recipes/passport#implementing-passport-jwt
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  "jwt"
) {
  constructor(config: ConfigService, private prisma: PrismaClient) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("JWT_SECRET")
    })
  }
  async validate(payload: {
    sub: number,
    email: string
  }) {
    // console.log({ payload });
    const user = this.prisma.user.findUnique({
      where: { id: payload.sub }
    })

    delete (await user).hash
    return user
  }

}