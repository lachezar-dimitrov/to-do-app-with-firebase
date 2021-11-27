import { IsNumber, IsPositive } from 'class-validator';

export class BanUserDTO {
    @IsNumber()
    @IsPositive()
    period: number;
}
