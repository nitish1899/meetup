import { IsEmail, IsNumber, IsString } from "class-validator";


export class SignupDto {
    @IsString()
    name!: string;

    @IsNumber()
    phone!: number;

    @IsEmail()
    email!: string;

    @IsString()
    password!: string;

    @IsString()
    confirmPassword!: string;
}