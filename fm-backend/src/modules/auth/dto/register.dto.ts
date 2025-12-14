import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole; // CLIENT or FREELANCER
}
