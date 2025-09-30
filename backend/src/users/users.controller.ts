import { Controller, Get, Post, Patch, Body, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorators';
import { UserRole } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Post()
    @Roles(UserRole.SYSTEM_ADMIN)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @Roles(UserRole.SYSTEM_ADMIN)
    findAll(@Query('name') name?: string, @Query('email') email?: string, @Query('role') role?: string) {
        return this.usersService.findAll(name, email, role);
    }

    @Patch('me/password')
    updatePassword(@Request() req, @Body() updatePasswordDto: UpdatePasswordDto) {
        return this.usersService.updatePassword(req.user.id, updatePasswordDto);
    }
}
