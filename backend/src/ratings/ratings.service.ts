import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(Rating)
        private ratingsRepository: Repository<Rating>,
    ) { }

    async createOrUpdate(userId: string, createRatingDto: CreateRatingDto) {
        const existing = await this.ratingsRepository.findOne({
            where: { userId, storeId: createRatingDto.storeId },
        });

        if (existing) {
            existing.rating = createRatingDto.rating;
            return this.ratingsRepository.save(existing);
        }

        const rating = this.ratingsRepository.create({
            ...createRatingDto,
            userId,
        });
        return this.ratingsRepository.save(rating);
    }
}
