import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServerSolicitationDto {
    @ApiProperty({
        description: 'ID of the server being requested to join',
        example: 5,
        type: Number,
        minimum: 1,
    })
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    server_id: number;

    @ApiProperty({
        description: 'ID of the user making the solicitation request',
        example: 10,
        type: Number,
        minimum: 1,
    })
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    user_id: number;

    @ApiProperty({
        description: 'Status of the solicitation',
        example: 1,
        type: Number,
        minimum: 1,
    })
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    @Type(() => Number)
    status_id: number;
}