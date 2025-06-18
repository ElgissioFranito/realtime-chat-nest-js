import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { discussions } from 'generated/prisma';
import { last } from 'rxjs';

@Injectable()
export class DiscussionsService {
    constructor(private prismaService: PrismaService) { }

    async createDiscussion(createDiscussionDto: CreateDiscussionDto) : Promise<discussions> {
        const { name, creatorId, memberIds } = createDiscussionDto;
        return this.prismaService.discussions.create({
            data: {
                name,
                creatorId,
                members: {
                    create: memberIds?.map((userId) => ({ userId })) || [],
                }
            },
            include: {
                creator: true,
                members: { include: { users: true } },
            },
        })
    }

    async listDiscussion() : Promise<discussions[]> {
        return this.prismaService.discussions.findMany(
            {
                include : {
                    creator: true,
                    _count : true,
                    members : true,
                    messages : true
                }
            }
        );
    }

}
