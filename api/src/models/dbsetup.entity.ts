import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity()
export class DbSetup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('nvarchar')
    message: string;

    @CreateDateColumn()
    createdOn: Date;
}
