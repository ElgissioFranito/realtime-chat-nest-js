import { Body, Controller, Get, Post } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';

@Controller('discussions')
export class DiscussionsController {

    constructor(private discussionService : DiscussionsService) {}

    @Post('/')
    createDiscussion(@Body() createDiscussionDto : CreateDiscussionDto) {
        return this.discussionService.createDiscussion(createDiscussionDto);
    }

    @Get('/')
    listDIscussion() {
        return this.discussionService.listDiscussion();
    }
}
