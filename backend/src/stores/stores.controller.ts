import { Controller, Get, Post, Body, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorators';
import { UserRole } from '../users/entities/user.entity';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';

@Controller('stores')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoresController {
    constructor(private storesService: StoresService) { }

    @Post()
    @Roles(UserRole.SYSTEM_ADMIN)
    create(@Body() createStoreDto: CreateStoreDto) {
        return this.storesService.create(createStoreDto);
    }

    @Get()
    findAll(@Query('search') search?: string, @Request() req?) {
        if (req.user.role === UserRole.STORE_OWNER) {
            return this.storesService.findByOwner(req.user.id);
        }
        return this.storesService.findAll(search);
    }
}
