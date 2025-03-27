import { ApiProperty } from '@nestjs/swagger';

export class EmpleadoDto {
  @ApiProperty({ description: 'ID del empleado', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID del usuario', example: 1 })
  usuarioId: number;

  @ApiProperty({ description: 'ID de la sucursal', example: 1 })
  sucursalId: number;
}

export class EmpleadoResponseDto {
  @ApiProperty({ description: 'ID del empleado', example: 1 })
  id: number;

  @ApiProperty({ description: 'Nombre del empleado', example: 'Juan Pérez' })
  nombre: string;

  @ApiProperty({ description: 'Email del empleado', example: 'juan@peluqueria.com' })
  email: string;

  @ApiProperty({ description: 'Rol del empleado', example: 'EMPLEADO' })
  rol: string;

  @ApiProperty({ description: 'ID de la sucursal', example: 1 })
  sucursalId: number;

  @ApiProperty({ description: 'Nombre de la sucursal', example: 'Sucursal Central' })
  sucursalNombre: string;

  @ApiProperty({ description: 'Fecha de creación', example: '2023-05-20T12:00:00.000Z' })
  createdAt: Date;
}
