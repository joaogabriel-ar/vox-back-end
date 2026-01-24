import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ServerSolicitation {
    @ApiProperty({
        description: 'Server solicitation ID',
        example: 1,
        type: Number,
    })
    id?: number;

    @ApiProperty({
        description: 'ID of the server being requested',
        example: 5,
        type: Number,
    })
    server_id: number;

    @ApiProperty({
        description: 'ID of the user making the solicitation',
        example: 10,
        type: Number,
    })
    user_id: number;

    @ApiProperty({
        description: 'ID of the solicitation status',
        example: 1,
        type: Number,
    })
    status_id: number;

    @ApiProperty({
        description: 'Server solicitation creation timestamp',
        example: '2024-01-15T10:30:00.000Z',
        type: Date,
    })
    created_at?: Date;

    @ApiProperty({
        description: 'Server solicitation last update timestamp',
        example: '2024-01-15T10:30:00.000Z',
        type: Date,
    })
    updated_at?: Date;

    // @ApiPropertyOptional({
    //     description: 'Status details of the solicitation',
    //     type: () => ServerSolicitationStatus,
    // })
    // status?: ServerSolicitationStatus;
}