import { Todo } from './../models/todo.entity';
import { FindUtility } from './utils/find-methods';
import { User } from 'src/models/user.entity';
import { Injectable } from '@nestjs/common';
import { TransformService } from './transform.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseUserDTO } from 'src/dtos/users/response-user.dto';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        private readonly transformer: TransformService,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Todo)
        private readonly todosRepository: Repository<Todo>,
        private readonly findUtility: FindUtility,
    ) {}

    async getAll(): Promise<ResponseUserDTO[]> {
        // add Admin authentication check
        const users = await this.usersRepository.find({
            where: {
                isDeleted: false,
            },
        });

        return users.map(user => this.transformer.toResponseUserDTO(user));
    }

    async create(userDTO: CreateUserDTO): Promise<ResponseUserDTO> {
        const user = this.usersRepository.create(userDTO);
        user.password = await bcrypt.hash(user.password, 10);

        const userCreated = await this.usersRepository.save(user);

        return this.transformer.toResponseUserDTO(userCreated);
    }

    async findById(id: number): Promise<ResponseUserDTO> {
        const user = await this.usersRepository.findOne(id);

        if (user) {
            return this.transformer.toResponseUserDTO(user);
        } else {
            return undefined;
        }
    }

    async banUser(userId: number, period: number) {
        const user = await this.usersRepository.findOne(userId);

        if (!user) {
            throw new Error('No user!');
        }

        user.banEndDate = new Date(Date.now() + period);

        return await this.usersRepository.save(user);
    }

    async delete(userId: number): Promise<{ message: string }> {
        const user = await this.findUtility.getUser(userId);

        user.isDeleted = true;
        await this.usersRepository.save(user);

        await this.todosRepository
            .createQueryBuilder()
            .update(Todo)
            .set({ isDeleted: true })
            .where({ createdFromId: userId })
            .execute();

        return {
            message: 'User has been deleted!',
        };
    }

    async recover(userId: number): Promise<{ message: string }> {
        const user = await this.findUtility.getUser(userId);

        user.isDeleted = false;
        await this.usersRepository.save(user);

        await this.todosRepository
            .createQueryBuilder()
            .update(Todo)
            .set({ isDeleted: false })
            .where({ createdFromId: userId })
            .execute();

        return {
            message: 'User has been recovered!',
        };
    }

    // Future modifications

    // async update(
    //     userDTO: UpdateUserDTO,
    //     userId: number,
    // ): Promise<ResponseUserDTO> {
    //     const user = await this.findOneOrFail(userId);

    //     user.username = userDTO.username;

    //     await this.usersRepository.update(userId, user);

    //     return this.transformer.toResponseUserDTO(user);
    // }

    // async follow(userId: number, followedId: number) {
    //     // const user1 = await this.findOneWithFollowedUsersOrFail(userId);
    //     // const user2 = await this.findOneWithFollowedUsersOrFail(followedId);
    //     // user1.following.push(user2);
    //     // await this.usersRepository.save(user1);

    //     await this.usersRepository
    //         .createQueryBuilder()
    //         .relation(User, 'following')
    //         .of(userId)
    //         .add(followedId);

    //     return {
    //         message: 'You have followed the user!',
    //     };
    // }

    // async unfollow(userId: number, followedId: number) {
    //     await this.usersRepository
    //         .createQueryBuilder()
    //         .relation(User, 'following')
    //         .of(userId)
    //         .remove(followedId);

    //     return {
    //         message: 'You have unfollowed the user!',
    //     };
    // }

    // async getFollowedUsers(userId: number): Promise<UserWithFollowedDTO> {
    //     return this.transformer.toUserWithFollowedUsersDTO(
    //         await this.findOneWithFollowedUsersOrFail(userId),
    //     );
    // // }
    // async getSuggestions(userId: number): Promise<ResponseUserDTO[]> {
    //     const user = await this.findOneWithFollowedUsersOrFail(userId);

    //     // this is not working
    //     return [];
    // }

    // private async findOneOrFail(userId: number): Promise<User> {
    //     const user = await this.usersRepository.findOne(userId);
    //     if (!user) {
    //         throw new Error('No user!');
    //     }

    //     return user;
    // }

    // private async findOneWithFollowedUsersOrFail(
    //     userId: number,
    // ): Promise<User> {
    //     const user = await this.usersRepository.findOne({
    //         where: { id: userId },
    //         relations: ['followers', 'following'],
    //     });

    //     if (!user) {
    //         throw new Error('No user!');
    //     }

    //     return user;
    // }
}
