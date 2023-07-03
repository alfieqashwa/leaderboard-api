import { IsEmail, IsNotEmpty, IsString, isEmail } from "class-validator";

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}