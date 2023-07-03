import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  signup() {
    return {
      test: "am I connected to sign up??"
    }
  }
  signin() {
    return {
      test: "am I connected to sign in??"
    }
  }
}