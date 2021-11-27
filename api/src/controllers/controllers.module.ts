import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { TodosController } from './todo.controller';
import { UsersController } from './users.controller';
import { AdminController } from './admin.controller';
import { AuthController } from './auth.controller';

@Module({
    imports: [ServicesModule],
    controllers: [
        TodosController,
        UsersController,
        AdminController,
        AuthController,
    ],
})
export class ControllersModule {}
