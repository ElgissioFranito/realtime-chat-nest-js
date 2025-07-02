import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { DiscussionsModule } from 'src/discussions/discussions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [ChatGateway],
})
export class ChatModule {}
