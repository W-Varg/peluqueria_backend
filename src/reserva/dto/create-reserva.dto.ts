import { IsDate, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { EstadoReserva } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateReservaDto {
  @IsDate()
  @Type(() => Date)
  fecha: Date;

  @IsString()
  horaInicio: string;

  @IsInt()
  @Type(() => Number)
  clienteId: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  empleadoId?: number;

  @IsInt()
  @Type(() => Number)
  servicioId: number;

  @IsEnum(EstadoReserva)
  @IsOptional()
  estado?: EstadoReserva = EstadoReserva.PENDIENTE;
}
