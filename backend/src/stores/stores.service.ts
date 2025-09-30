import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Store } from './entities/store.entity';
import { User, UserRole } from '../users/entities/user.entity';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoresService {
    constructor(
        @InjectRepository(Store)
        private storesRepository: Repository<Store>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createStoreDto: CreateStoreDto) {
        const owner = await this.usersRepository.findOne({ where: { id: createStoreDto.ownerId } });
        if (!owner || owner.role !== UserRole.STORE_OWNER) {
            throw new Error('Owner must be a Store Owner');
        }
        const store = this.storesRepository.create(createStoreDto);
        return this.storesRepository.save(store);
    }

    async findAll(search?: string) {
        const where: any = search
            ? [{ name: Like(`%${search}%`) }, { address: Like(`%${search}%`) }]
            : {};

        return this.storesRepository.find({
            where,
            relations: ['ratings'],
        });
    }

    async findByOwner(ownerId: string) {
        return this.storesRepository.find({
            where: { ownerId },
            relations: ['ratings', 'ratings.user'],
        });
    }
}
