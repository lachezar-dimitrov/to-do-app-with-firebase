import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDTO {
    @IsString()
    @IsNotEmpty()
    public title: string;

    @IsString()
    @IsNotEmpty()
    public description: string;

    @IsString()
    @IsNotEmpty()
    public imageUrl: string;
}
