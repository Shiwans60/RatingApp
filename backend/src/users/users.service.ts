import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        await this.usersRepository.save(user);
        const { password, ...result } = user;
        return result;
    }

    async findAll(name?: string, email?: string, role?: string) {
        const where: any = {};
        if (name) where.name = Like(`%${name}%`);
        if (email) where.email = Like(`%${email}%`);
        if (role) where.role = role;

        const users = await this.usersRepository.find({ where });
        return users.map(({ password, ...user }) => user);
    }

    async updatePassword(userId: string, updatePasswordDto: UpdatePasswordDto) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user || !(await bcrypt.compare(updatePasswordDto.currentPassword, user.password))) {
            throw new Error('Invalid current password');
        }
        user.password = await bcrypt.hash(updatePasswordDto.newPassword, 10);
        await this.usersRepository.save(user);
        return { message: 'Password updated successfully' };
    }
}
