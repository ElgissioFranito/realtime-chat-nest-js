import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('users')
export class UsersController {

    constructor(private prisma : PrismaService) {}

    @Get()
    findAll() {
        return "Bonjour";
    }

    @Post()
    create(@Body() dataArticle) {
        return dataArticle;
    }
}
