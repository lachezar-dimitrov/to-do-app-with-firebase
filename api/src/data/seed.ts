import { Todo } from './../models/todo.entity';
import { User } from '../models/user.entity';
import { createConnection, Repository } from 'typeorm';
import { DbSetup } from '../models/dbsetup.entity';
import { UsersData } from './users.data';
import { TodosData } from './todos.data';

// SENSITIVE DATA ALERT! - Normally the seed and the admin credentials should not be present in the public repository!
// Run: `npm run seed` to seed the database

class Seed {
    constructor(
        private readonly _connection: any,
        private readonly usersData: UsersData,
        private readonly todosData: TodosData,
    ) {}

    private async users() {
        return await this.usersData.users();
    }
    private async getUsersRepository(): Promise<Repository<User>> {
        return this._connection.manager.getRepository(User);
    }

    private async todos() {
        return await this.todosData.todos();
    }
    private async getTodosRepository(): Promise<Repository<Todo>> {
        return this._connection.manager.getRepository(Todo);
    }

    async seedUsers() {
        for (const user of await this.users()) {
            const userRepository = await this.getUsersRepository();
            const foundUser = await userRepository.findOne({
                username: user.username,
            });

            if (!foundUser) {
                const userToCreate = await userRepository.create(user);
                console.log(await userRepository.save(userToCreate));
            }
        }
    }

    async seedTodos() {
        for (const todo of await this.todos()) {
            const todoRepository = await this.getTodosRepository();
            const foundTodo = await todoRepository.findOne({
                id: todo.id,
            });

            if (!foundTodo) {
                const todoToCreate = await todoRepository.create(todo);
                console.log(await todoRepository.save(todoToCreate));
            }
        }
    }

    async beginSetup() {
        const dbSetupRepo = this._connection.manager.getRepository(DbSetup);
        const setupData = await dbSetupRepo.find({});

        if (setupData.length) {
            throw new Error(`Data has been already set up`);
        }
    }

    async completeSetup() {
        const dbsetupRepo = this._connection.manager.getRepository(DbSetup);

        await dbsetupRepo.save({ message: 'Setup has been completed!' });
    }
}

const execute = async () => {
    console.log('Seed started!');

    const connection = await createConnection();

    const usersData = new UsersData();
    const todosData = new TodosData();
    const seed = new Seed(connection, usersData, todosData);

    try {
        await seed.beginSetup();

        await seed.seedUsers();
        await seed.seedTodos();

        await seed.completeSetup();
    } catch (error) {
        console.log(error.message);
    }

    console.log('Seed completed!');
    connection.close();
};

execute().catch(console.error);
