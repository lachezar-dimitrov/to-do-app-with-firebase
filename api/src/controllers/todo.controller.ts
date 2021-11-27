import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { TodosService } from 'src/services/todos.service';
import { ResponseTodoDTO } from 'src/dtos/todos/response-todo.dto';
import { UserId } from 'src/auth/user-id.decorator';
import { BlacklistGuard } from 'src/auth/blacklist.guard';
import { RateTodoDTO } from 'src/dtos/todos/rate-todo.dto';

@Controller('todos')
@UseGuards(BlacklistGuard)
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get()
    async allTodos(): Promise<ResponseTodoDTO[]> {
        return await this.todosService.readAll();
    }

    @Get(':id')
    async getTodosById(@Param('id') id: string): Promise<ResponseTodoDTO> {
        return await this.todosService.readById(+id);
    }
}
