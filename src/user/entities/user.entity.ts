import { ApiProperty } from '@nestjs/swagger';

export class User {
    @ApiProperty({
        description: 'User ID',
        example: 1,
        type: Number
    })
    id?: number;

    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
        type: String
    })
    email: string;

    @ApiProperty({
        description: 'Full name of the user',
        example: 'John Doe',
        type: String,
    })
    name: string;

    @ApiProperty({
        description: 'Role of the user',
        example: 1,
        type: Number,
    })
    role_id: number;

    @ApiProperty({
        description: 'User password',
        example: 'StrongP@ssw0rd',
        type: String,
    })
    password?: string;

    @ApiProperty({
        description: 'User creation timestamp',
        example: '2024-01-15T10:30:00.000Z',
        type: Date
    })
    created_at?: Date;

    @ApiProperty({
        description: 'User last update timestamp',
        example: '2024-01-15T10:30:00.000Z',
        type: Date
    })
    updated_at?: Date;
}