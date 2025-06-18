import { Global, Module } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { DiscussionsController } from './discussions.controller';

@Global()
@Module({
    providers: [DiscussionsService],
    exports: [DiscussionsService],
    controllers: [DiscussionsController]
})
export class DiscussionsModule { }
