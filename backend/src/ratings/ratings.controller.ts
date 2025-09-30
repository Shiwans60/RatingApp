import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guards';
import { Roles } from '../auth/decorators/roles.decorators';
import { UserRole } from '../users/entities/user.entity';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Controller('ratings')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RatingsController {
    constructor(private ratingsService: RatingsService) { }

    @Post()
    @Roles(UserRole.NORMAL_USER)
    create(@Request() req, @Body() createRatingDto: CreateRatingDto) {
        return this.ratingsService.createOrUpdate(req.user.id, createRatingDto);
    }
}
