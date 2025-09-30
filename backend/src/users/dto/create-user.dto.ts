import { IsEmail, IsString, IsEnum, Length, Matches } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
    @IsString()
    @Length(20, 60)
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 16)
    @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one uppercase letter and one special character' })
    password: string;

    @IsString()
    @Length(1, 400)
    address: string;

    @IsEnum(UserRole)
    role: UserRole;
}
