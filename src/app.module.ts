import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ChatModule } from './chat/chat.module';
import { DiscussionsModule } from './discussions/discussions.module';

@Module({
  imports: [PrismaModule, UsersModule, ChatModule, DiscussionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
