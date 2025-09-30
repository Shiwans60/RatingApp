// src/auth/dto/signup.dto.ts

import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    Matches,
} from 'class-validator';

export class SignupDto {
    @IsString()
    @IsNotEmpty()
    @Length(2, 60)
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Length(8, 20) // Password length between 8 and 20
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password is too weak. It must contain an uppercase letter, a lowercase letter, and a number or special character.',
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 400)
    address: string;
}