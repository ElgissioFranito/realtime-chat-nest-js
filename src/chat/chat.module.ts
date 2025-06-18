import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { DiscussionsModule } from 'src/discussions/discussions.module';

@Module({
  providers: [ChatGateway],
})
export class ChatModule {}
