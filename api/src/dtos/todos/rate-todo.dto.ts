import { IsNumber, IsPositive } from 'class-validator';

export class RateTodoDTO {
    @IsNumber()
    @IsPositive()
    value: number;
}
