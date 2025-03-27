import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateEmpleadoDto {
  @ApiProperty({
    description: 'ID del usuario asociado al empleado',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  usuarioId: number;

  @ApiProperty({
    description: 'ID de la sucursal donde trabaja el empleado',
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  sucursalId: number;
}
