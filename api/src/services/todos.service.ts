import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { Todo } from 'src/models/todo.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransformService } from './transform.service';
import { ResponseTodoDTO } from 'src/dtos/todos/response-todo.dto';
import { CreateTodoDTO } from 'src/dtos/todos/create-todo.dto';
import { TodoStatus } from 'src/common/enums/todo-status';

@Injectable()
export class TodosService {
    constructor(
        private readonly transformer: TransformService,

        @InjectRepository(Todo)
        private readonly todosRepository: Repository<Todo>,
    ) {}

    async createTodo(todoDTO: CreateTodoDTO): Promise<ResponseTodoDTO> {
        const todo = this.todosRepository.create(todoDTO);

        const todoCreated = await this.todosRepository.save(todo);

        return this.transformer.toResponseTodoDTO(todoCreated);
    }

    async readAll(): Promise<ResponseTodoDTO[]> {
        const todos = await this.todosRepository.find({
            where: {
                isDeleted: false,
            },
        });

        return todos.map(todo => this.transformer.toResponseTodoDTO(todo));
    }

    async readById(id: number): Promise<ResponseTodoDTO> {
        const todo = await this.todosRepository.findOne({
            where: {
                id,
                isDeleted: false,
            },
        });

        if (todo !== undefined) {
            return this.transformer.toResponseTodoDTO(todo);
        } else {
            throw new NotFoundException(`No todo with ${id} id found!`);
        }
    }

    async updateTodo(id: number, body: Partial<Todo>): Promise<UpdateResult> {
        const todo = this.transformer.toCreateTodoDTO(body);

        return await this.todosRepository.update(id, todo);
    }

    async deleteTodo(TodoId: number): Promise<void> {
        const todoFound = await this.todosRepository.findOne(TodoId);

        if (!todoFound) {
            throw new BadRequestException(
                `There is no todo with id ${TodoId} found!`,
            );
        }

        todoFound.isDeleted = true;
        todoFound.status = TodoStatus.Unlisted;

        await this.todosRepository.save(todoFound);
    }
}
