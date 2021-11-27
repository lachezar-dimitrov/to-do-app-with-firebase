import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
} from 'typeorm';
import { TodoStatus } from '../common/enums/todo-status';

@Entity('todos')
export class Todo {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @CreateDateColumn()
    public addedOn: Date;

    @Column('nvarchar')
    public title: string;

    @Column('text')
    public description: string;

    @Column('nvarchar')
    public imageUrl: string;

    @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.Free })
    public status: TodoStatus;

    @Column({ type: 'boolean', default: false })
    public isDone: boolean;

    @Column({ type: 'boolean', default: false })
    public isDeleted: boolean;
}
