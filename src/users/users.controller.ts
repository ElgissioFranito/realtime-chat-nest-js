import { Body, Controller, Get, Post, Put, ParseIntPipe, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private userService : UsersService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get('/:id') 
    getOne(@Param('id') id : string){
        return this.userService.getOne(+id);
    }

    @Post()
    create(@Body() request : CreateUserDto) {
        return this.userService.createUser(request);
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() request : CreateUserDto) {
        return this.userService.updateUser(+id,request);
    }

    @Delete('/:id')
    remove(@Param('id') id : string){
        return this.userService.removeUser(+id);
    }

}
