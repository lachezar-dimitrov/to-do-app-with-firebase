import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ControllersModule } from './controllers/controllers.module';

@Module({
    imports: [
        ControllersModule,
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'todosdb',
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
    ],
})
export class AppModule {}
