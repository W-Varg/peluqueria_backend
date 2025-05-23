import { IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { EstadoReserva } from '@prisma/client';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDto {
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  fecha: Date;

  @IsString()
  @ApiProperty()
  horaInicio: Date;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  clienteId: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  servicioId: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  empleadoId?: number;

  @ApiProperty()
  @IsEnum(EstadoReserva)
  @IsOptional()
  estado?: EstadoReserva = EstadoReserva.PENDIENTE;
}
