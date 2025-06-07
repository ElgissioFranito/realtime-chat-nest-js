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

    async findAllPaginate(page: number = 1, limit: number = 10): Promise<users[]> {
        return this.prismaService.users.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async searchUser(word: string): Promise<users[]> {
        return this.prismaService.users.findMany({
            where: {
                name: { contains: word } // Recherche partielle
            }
        });

        // // s'il ya des filtre ou plusieurs champs de recherche
        // const whereConditions = {};

        // if (filters.email) {
        //     whereConditions['email'] = {
        //         contains: filters.email,
        //         mode: 'insensitive'
        //     };
        // }

        // if (filters.name) {
        //     whereConditions['name'] = {
        //         contains: filters.name,
        //         mode: 'insensitive'
        //     };
        // }

        // if (filters.role) {
        //     whereConditions['role'] = filters.role;
        // }

        // return this.prisma.user.findMany({
        //     where: whereConditions
        // });
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

    async removeUser(id: number): Promise<users> {
        return this.prismaService.users.delete({
            where: { id }
        });
    }

}
