import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from 'src/models/todo.entity';

/// WARNING: This is experimental feature, but some services may rely on it!

@Injectable()
export class FindUtility {
    constructor(
        @InjectRepository(Todo)
        private readonly todosRepository: Repository<Todo>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    async getUser(userId: number): Promise<User> {
        const user = await this.usersRepository.findOne({
            where: {
                id: userId,
            },
        });

        if (!user) {
            throw new BadRequestException(`No user with id ${userId} found!`);
        }

        return user;
    }
}
