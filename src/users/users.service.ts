import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { users } from 'generated/prisma';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) { }

    async createUser(createUserDto: CreateUserDto): Promise<users> {
        return await this.prismaService.users.create({
            data: createUserDto
        });
    }

}
