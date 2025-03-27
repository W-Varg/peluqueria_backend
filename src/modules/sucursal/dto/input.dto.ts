import { PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateSucursalDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('PE') // Ajusta el código de país según necesites
  telefono: string;
}

export class UpdateSucursalDto extends PartialType(CreateSucursalDto) {}

/* ------------------------------------------------------------------------------------------------------------------ */

import { ApiProperty } from '@nestjs/swagger';

export class SucursalDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  direccion: string;

  @ApiProperty()
  telefono: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
