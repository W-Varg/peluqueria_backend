import { PreferenciasCliente } from '../../domain/value-objects/preferencias-cliente';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Juan Pérez',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Número de teléfono del cliente',
    example: '+591 77777777',
  })
  @IsString()
  telefono: string;

  @ApiProperty({
    description: 'Correo electrónico del cliente',
    example: 'juan.perez@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Preferencias del cliente',
    required: false,
  })
  @IsOptional()
  preferencias?: PreferenciasCliente;
}
