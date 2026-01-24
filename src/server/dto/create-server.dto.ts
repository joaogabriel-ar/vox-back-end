import { IsString, IsBoolean, IsOptional, MinLength, MaxLength, IsInt } from "@nestjs/class-validator";
import { Optional } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateServerDto {
    @ApiProperty({
        example: "Gaming Community",
        description: "Display name for the server. Must be between 1-100 characters.",
        minLength: 1,
        maxLength: 100
    })
    @IsString({ message: 'Server name must be a string' })
    @MinLength(1, { message: 'Server name is required and cannot be empty' })
    @MaxLength(100, { message: 'Server name cannot exceed 100 characters' })
    name: string;

    @ApiPropertyOptional({
        example: "https://cdn.example.com/servers/avatar-123.png",
        description: "Optional server avatar/logo URL. Supports JPG, PNG, or GIF formats.",
        nullable: true
    })
    @IsOptional()
    @IsString({ message: 'Server image must be a valid URL string' })
    server_image?: string | null;

    @ApiProperty({
        example: true,
        description: "Public servers are visible to all users. Private servers require invitation.",
        default: false
    })
    @IsBoolean({ message: 'is_public must be a boolean value (true/false)' })
    is_public: boolean;
}