import { IsDate, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EstadoReserva } from '@prisma/client';

export class CreateReservationDto {
  @ApiProperty({ description: 'Fecha de la reserva' })
  @IsDate()
  fecha: Date;

  @ApiProperty({ description: 'Hora de la reserva' })
  @IsDate()
  hora: Date;

  @ApiProperty({ description: 'ID del cliente' })
  @IsNumber()
  clienteId: number;

  @ApiProperty({ description: 'ID del servicio' })
  @IsNumber()
  servicioId: number;
}

export class UpdateReservationDto {
  @ApiProperty({ description: 'Fecha de la reserva', required: false })
  @IsOptional()
  @IsDate()
  fecha?: Date;

  @ApiProperty({ description: 'Hora de la reserva', required: false })
  @IsOptional()
  @IsDate()
  hora?: Date;

  @ApiProperty({ description: 'ID del empleado', required: false })
  @IsOptional()
  @IsNumber()
  empleadoId?: number;

  @ApiProperty({ description: 'Estado de la reserva', required: false })
  @IsOptional()
  @IsEnum(EstadoReserva)
  estado?: EstadoReserva;
}

export class ReservationResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  fecha: Date;

  @ApiProperty()
  hora: Date;

  @ApiProperty()
  clienteId: number;

  @ApiProperty({ required: false, nullable: true })
  empleadoId: number | null;

  @ApiProperty()
  servicioId: number;

  @ApiProperty({ enum: EstadoReserva })
  estado: EstadoReserva;
}
