import { IsEmail, Length, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    @Length(1, 15)
    public username: string;

    @IsString()
    @IsNotEmpty()
    public firstName: string;

    @IsString()
    @IsNotEmpty()
    public lastName: string;

    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    public password: string;
}
