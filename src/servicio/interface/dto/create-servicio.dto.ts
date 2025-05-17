import { IsString, IsNumber, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductoServicioDto {
  @ApiProperty({
    description: 'ID del producto asociado al servicio',
    example: 1,
  })
  @IsNumber()
  productoId: number;

  @ApiProperty({
    description: 'Cantidad del producto necesaria para el servicio',
    example: 1,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  cantidad: number;
}

export class CreateServicioDto {
  @ApiProperty({
    description: 'Nombre del servicio',
    example: 'Corte de cabello',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    description: 'Descripción detallada del servicio',
    example: 'Corte de cabello profesional con tijeras y máquina',
  })
  @IsString()
  descripcion: string;

  @ApiProperty({
    description: 'Duración del servicio en minutos',
    example: 30,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  duracion: number;

  @ApiProperty({
    description: 'Precio del servicio',
    example: 25.99,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  precio: number;

  @ApiProperty({
    description: 'Lista de productos necesarios para el servicio',
    type: [ProductoServicioDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoServicioDto)
  productos: ProductoServicioDto[];
}
