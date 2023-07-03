import { IsNotEmpty, IsString, isEmail } from "class-validator";

export class AuthDto {
  @isEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}