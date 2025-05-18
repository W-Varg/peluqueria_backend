import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional, IsEnum } from 'class-validator';
import { EstadoReserva } from '../value-objects/estado-reserva';

export class UpdateReservaDto {
  @ApiProperty({
    description: 'Fecha de la reserva',
    example: '2024-03-20',
    required: false,
  })
  @IsDate()
  @IsOptional()
  fecha?: Date;

  @ApiProperty({
    description: 'Hora de inicio de la reserva (formato HH:mm)',
    example: '14:30',
    required: false,
  })
  @IsString()
  @IsOptional()
  horaInicio?: string;

  @ApiProperty({
    description: 'ID del cliente',
    example: '1',
    required: false,
  })
  @IsString()
  @IsOptional()
  clienteId?: string;

  @ApiProperty({
    description: 'ID del empleado',
    example: '1',
    required: false,
  })
  @IsString()
  @IsOptional()
  empleadoId?: string;

  @ApiProperty({
    description: 'ID del servicio',
    example: '1',
    required: false,
  })
  @IsString()
  @IsOptional()
  servicioId?: string;

  @ApiProperty({
    description: 'Estado de la reserva',
    enum: EstadoReserva,
    required: false,
  })
  @IsEnum(EstadoReserva)
  @IsOptional()
  estado?: EstadoReserva;
} 