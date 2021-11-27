import { FindUtility } from './utils/find-methods';
import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from 'src/models/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransformService } from './transform.service';
import { UsersService } from './users.service';
import { User } from 'src/models/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/secret';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt-strategy';
import { Token } from 'src/models/token.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Todo, User, Token]),
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '7d',
            },
        }),
    ],
    providers: [
        TodosService,
        UsersService,
        TransformService,
        AuthService,
        JwtStrategy,
        FindUtility,
    ],
    exports: [TodosService, UsersService, AuthService],
})
export class ServicesModule {}
