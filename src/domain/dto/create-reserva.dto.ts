import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional, IsEnum } from 'class-validator';
import { EstadoReserva } from '../value-objects/estado-reserva';

export class CreateReservaDto {
  @ApiProperty({
    description: 'Fecha de la reserva',
    example: '2024-03-20',
  })
  @IsDate()
  fecha: Date;

  @ApiProperty({
    description: 'Hora de inicio de la reserva (formato HH:mm)',
    example: '14:30',
  })
  @IsString()
  horaInicio: string;

  @ApiProperty({
    description: 'ID del cliente',
    example: '1',
  })
  @IsString()
  clienteId: string;

  @ApiProperty({
    description: 'ID del empleado',
    example: '1',
  })
  @IsString()
  empleadoId: string;

  @ApiProperty({
    description: 'ID del servicio',
    example: '1',
  })
  @IsString()
  servicioId: string;

  @ApiProperty({
    description: 'Estado de la reserva',
    enum: EstadoReserva,
    default: EstadoReserva.PENDIENTE,
    required: false,
  })
  @IsEnum(EstadoReserva)
  @IsOptional()
  estado?: EstadoReserva;
}
