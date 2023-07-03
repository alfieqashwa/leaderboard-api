import { Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService {
  signup(dto: AuthDto) {
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