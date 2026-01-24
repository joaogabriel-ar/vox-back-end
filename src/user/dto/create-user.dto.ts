import { IsEmail, IsInt, IsNotEmpty, IsString, MaxLength } from "@nestjs/class-validator";
import { Optional } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateUserDto {

    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
        required: true
    })
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiPropertyOptional({
        description: 'Full name of the user',
        example: 'John Doe',
        maxLength: 100,
        required: true
    })
    @IsString({ message: 'Name must be a string' })
    @MaxLength(100, { message: 'Name cannot be longer than 100 characters' })
    name: string;

    @ApiProperty({
        description: 'User confirm password',
        example: 'StrongP@ssw0rd',
        required: true
    })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @ApiProperty({
        description: 'User password',
        example: 'StrongP@ssw0rd',
        required: true
    })
    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    confirm_password: string;

    @ApiProperty({
        description: 'User role',
        example: 1,
        required: true
    })
    @IsInt({ message: 'role_id must a integer' })
    @Optional()
    role_id: number;

}