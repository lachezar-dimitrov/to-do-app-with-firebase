import { TodoStatus } from 'src/common/enums/todo-status';

export class ResponseTodoDTO {
    public id: number;
    public title: string;
    public description: string;
    public imageUrl: string;
    public status: TodoStatus;
    public isDone: boolean;
    public addedOn: Date;
}
