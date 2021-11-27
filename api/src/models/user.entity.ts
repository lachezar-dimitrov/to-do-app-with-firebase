import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../common/enums/user-role';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.Basic,
    })
    role: UserRole;

    @Column({ default: false })
    isDeleted: boolean;

    @Column({
        nullable: true,
    })
    banEndDate: Date;
}
