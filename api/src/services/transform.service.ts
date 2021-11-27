import { Todo } from './../models/todo.entity';
import { ResponseTodoDTO } from 'src/dtos/todos/response-todo.dto';
import { ResponseUserDTO } from 'src/dtos/users/response-user.dto';
import { User } from 'src/models/user.entity';
import { CreateTodoDTO } from 'src/dtos/todos/create-todo.dto';

export class TransformService {
    toResponseTodoDTO(todo: Todo): ResponseTodoDTO {
        return {
            id: todo.id,
            title: todo.title,
            description: todo.description,
            imageUrl: todo.imageUrl,
            status: todo.status,
            isDone: todo.isDone,
            addedOn: todo.addedOn,
        };
    }

    toResponseUserDTO(user: User): ResponseUserDTO {
        return {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
    }

    toCreateTodoDTO(todo: Partial<Todo>): CreateTodoDTO {
        return {
            title: todo.title,
            description: todo.description,
            imageUrl: todo.imageUrl,
        };
    }
}
