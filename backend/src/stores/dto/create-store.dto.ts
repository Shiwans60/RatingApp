import { IsEmail, IsString, IsUUID, Length } from 'class-validator';

export class CreateStoreDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(1, 400)
    address: string;

    @IsUUID()
    ownerId: string;
}
