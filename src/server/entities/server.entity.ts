import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class Server {
    @ApiProperty({
        description: 'Server ID',
        example: 1,
        type: Number
    })
    id: number;

    @ApiProperty({
        description: 'Name of the server',
        example: 'My Awesome Server',
        type: String,
    })
    name: string;

    @ApiPropertyOptional({
        description: 'Server image URL',
        example: 'https://example.com/server-image.jpg',
        type: String,
    })
    server_image: string | null;

    @ApiProperty({
        description: 'Whether the server is public or private',
        example: true,
        type: Boolean,
    })
    is_public: boolean;

    @ApiProperty({
        description: 'Server creation timestamp',
        example: '2024-01-15T10:30:00.000Z',
        type: Date
    })
    created_at: Date;

    @ApiProperty({
        description: 'Server last update timestamp',
        example: '2024-01-15T10:30:00.000Z',
        type: Date
    })
    updated_at: Date;

    @ApiPropertyOptional({
        description: 'List of users in the server',
        type: Array,
    })
    
    users?: User[];
}