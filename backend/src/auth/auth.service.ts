import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../users/entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService,
    ) { }

    async signup(signupDto: SignupDto) {

        const existingUser = await this.usersRepository.findOne({ where: { email: signupDto.email } });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }


        const hashedPassword = await bcrypt.hash(signupDto.password, 10);
        const user = this.usersRepository.create({
            ...signupDto,
            password: hashedPassword,
            role: UserRole.NORMAL_USER,
        });
        await this.usersRepository.save(user);
        const { password, ...result } = user;
        return { user: result, token: this.generateToken(user) };
    }

    async login(loginDto: LoginDto) {
        const user = await this.usersRepository.findOne({ where: { email: loginDto.email } });
        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const { password, ...result } = user;
        return { user: result, token: this.generateToken(user) };
    }

    private generateToken(user: User) {
        return this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
    }
}
