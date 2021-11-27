import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    ValidationPipe,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { ResponseTodoDTO } from 'src/dtos/todos/response-todo.dto';
import { TodosService } from 'src/services/todos.service';
import { CreateTodoDTO } from 'src/dtos/todos/create-todo.dto';
import { Todo } from 'src/models/todo.entity';
import { ResponseUserDTO } from 'src/dtos/users/response-user.dto';
import { UsersService } from 'src/services/users.service';
import { BanUserDTO } from 'src/dtos/users/ban-user.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/common/enums/user-role';
import { BlacklistGuard } from 'src/auth/blacklist.guard';

@Controller('admin')
@UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
export class AdminController {
    constructor(
        private readonly todosService: TodosService,
        private readonly usersService: UsersService,
    ) {}

    @Get('todos')
    async allTodos(): Promise<ResponseTodoDTO[]> {
        return await this.todosService.readAll();
    }

    @Post('todos')
    async createTodo(
        @Body(new ValidationPipe({ whitelist: true })) todoDTO: CreateTodoDTO,
    ): Promise<ResponseTodoDTO> {
        return await this.todosService.createTodo(todoDTO);
    }

    @Get('todos/:id')
    async getTodoById(@Param('id') id: string): Promise<ResponseTodoDTO> {
        return await this.todosService.readById(+id);
    }

    @Delete('todos/:id')
    async deleteTodo(@Param('id') id: string): Promise<{ message: string }> {
        await this.todosService.deleteTodo(+id);

        return {
            message: `Todo deleted!`,
        };
    }

    @Put('todos/:id')
    async updateTodo(
        @Body() body: Partial<Todo>,
        @Param('id') id: string,
    ): Promise<{ message: string }> {
        await this.todosService.updateTodo(+id, body);

        return {
            message: `Todo updated!`,
        };
    }

    @Get('users')
    async allUsers(): Promise<ResponseUserDTO[]> {
        return await this.usersService.getAll();
    }

    @Get('users/:id')
    async getUserById(@Param('id') id: string): Promise<ResponseUserDTO> {
        return await this.usersService.findById(+id);
    }

    // @Put(':id')
    // async updateUser(
    //     @Param('id') userId: string,
    //     @Body(new ValidationPipe({ whitelist: true })) userDto: UpdateUserDTO,
    //     @UserId() loggedUserId: number,
    // ): Promise<ResponseUserDTO> {
    //     // this.isAuthorized(userId, loggedUserId);

    //     return await this.usersService.updateUser(userDto, +userId);
    // }

    @Delete('users/:id')
    // @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    async deleteUser(@Param('id') userId: string) {
        return await this.usersService.delete(+userId);
    }

    @Post('users/:id')
    @UseGuards(BlacklistGuard, new RolesGuard(UserRole.Admin))
    async recoverUser(@Param('id') userId: string) {
        return await this.usersService.recover(+userId);
    }

    // Ban endpoints \\

    @Post('users/:id/ban')
    async banUser(
        @Param('id', ParseIntPipe) userId: number,
        @Body(new ValidationPipe({ whitelist: true })) banDto: BanUserDTO,
    ) {
        return await this.usersService.banUser(userId, banDto.period);
    }
}
