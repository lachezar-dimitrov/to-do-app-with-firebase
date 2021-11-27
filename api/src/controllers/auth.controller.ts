import { Controller, Post, Body, ValidationPipe, Delete } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { LoginUserDTO } from 'src/dtos/users/login-user.dto';
import { GetToken } from 'src/auth/get-token.decorator';

@Controller('session')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async login(
        @Body(new ValidationPipe({ whitelist: true })) userDto: LoginUserDTO,
    ): Promise<{ token: string }> {
        return await this.authService.login(userDto.username, userDto.password);
    }

    @Delete()
    async logout(@GetToken() token: string): Promise<{ message: string }> {
        await this.authService.blacklist(token?.slice(7));

        return {
            message: 'You have been logged out!',
        };
    }
}
