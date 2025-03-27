// src/auth/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Rol } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  rol: Rol;

  @ApiProperty()
  @IsString()
  @IsOptional()
  telefono?: string;
}

// src/auth/interfaces/jwt-payload.interface.ts
export interface JwtPayload {
  id: number;
  email: string;
  name: string;
}
