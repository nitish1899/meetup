import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";


export class SignupDto {
    @IsString()
    name!: string;

    @IsNumber()
    phone!: number;

    @IsEmail()
    email!: string;

    @IsOptional()
    profileImage!: string | null;

    @IsString()
    pin!: string;

    @IsString()
    confirmPin!: string;
}