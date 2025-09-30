import { IsInt, IsUUID, Min, Max } from 'class-validator';

export class CreateRatingDto {
    @IsInt()
    @Min(1)
    @Max(5)
    rating: number;

    @IsUUID()
    storeId: string;
}
