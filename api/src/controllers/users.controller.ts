import {
    Controller,
    Get,
    Body,
    Post,
    Param,
    NotFoundException,
    ValidationPipe,
    UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/services/users.service';
import { ResponseUserDTO } from 'src/dtos/users/response-user.dto';
import { CreateUserDTO } from 'src/dtos/users/create-user.dto';
import { BlacklistGuard } from 'src/auth/blacklist.guard';
import { UserId } from 'src/auth/user-id.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(BlacklistGuard)
    async allUsers(): Promise<ResponseUserDTO[]> {
        return await this.usersService.getAll();
    }

    @Post('register')
    async createUser(
        @Body(new ValidationPipe({ whitelist: true })) userDTO: CreateUserDTO,
    ): Promise<ResponseUserDTO> {
        return await this.usersService.create(userDTO);
    }

    @Get(':id')
    @UseGuards(BlacklistGuard)
    async getUserById(@Param('id') id: string): Promise<ResponseUserDTO> {
        const user = await this.usersService.findById(+id);

        if (user === undefined) {
            throw new NotFoundException(`No user with id ${id} found.`);
        }

        return user;
    }

    // private isAuthorized(userId: string, loggedUserId: number): void {
    //     if (Number(userId) !== loggedUserId) {
    //         throw new UnauthorizedException();
    //     }
    // }
}
