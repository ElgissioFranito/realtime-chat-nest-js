import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { users } from 'generated/prisma';

@Injectable()
export class UsersService {
    constructor(private prismaService: PrismaService) { }

    async findAll(): Promise<users[]> {
        return this.prismaService.users.findMany();
    }

    async getOne(id: number): Promise<users | null> {
        return this.prismaService.users.findUnique({
            where: { id }
        });
    }

    async createUser(createUserDto: CreateUserDto): Promise<users> {
        return this.prismaService.users.create({
            data: createUserDto
        });
    }

    async updateUser(id: number, updateUserDto: CreateUserDto): Promise<users> {
        return this.prismaService.users.update({
            where: { id },
            data: updateUserDto
        });
    }

    async removeUser(id: number) {
        return this.prismaService.users.delete({
            where: { id }
        });
    }

}
