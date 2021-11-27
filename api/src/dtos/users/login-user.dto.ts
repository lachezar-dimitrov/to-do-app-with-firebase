import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDTO {
    @IsString()
    @IsNotEmpty()
    username: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}
