import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ServicioService } from '../application/servicio.service';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('servicios')
@Controller('servicios')
export class ServicioController {
  constructor(private readonly servicioService: ServicioService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los servicios' })
  @ApiResponse({ status: 200, description: 'Lista de servicios obtenida con éxito' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findAll() {
    try {
      return await this.servicioService.findAll();
    } catch (error) {
      throw new HttpException('Error al obtener servicios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un servicio por ID' })
  @ApiResponse({ status: 200, description: 'Servicio encontrado' })
  @ApiResponse({ status: 404, description: 'Servicio no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.servicioService.findById(id);
    } catch (error) {
      throw new HttpException('Servicio no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo servicio' })
  @ApiResponse({ status: 201, description: 'Servicio creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  async create(@Body() createServicioDto: CreateServicioDto) {
    try {
      await this.servicioService.create(createServicioDto);
      return { message: 'Servicio creado exitosamente' };
    } catch (error) {
      throw new HttpException('Error al crear servicio', HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un servicio existente' })
  @ApiResponse({ status: 200, description: 'Servicio actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Servicio no encontrado' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServicioDto: UpdateServicioDto,
  ) {
    try {
      await this.servicioService.update(id, updateServicioDto);
      return { message: 'Servicio actualizado exitosamente' };
    } catch (error) {
      throw new HttpException('Error al actualizar servicio', HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un servicio' })
  @ApiResponse({ status: 200, description: 'Servicio eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Servicio no encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.servicioService.delete(id);
      return { message: 'Servicio eliminado exitosamente' };
    } catch (error) {
      throw new HttpException('Error al eliminar servicio', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/disponibilidad')
  @ApiOperation({ summary: 'Verificar disponibilidad de un servicio' })
  @ApiResponse({ status: 200, description: 'Disponibilidad verificada exitosamente' })
  @ApiResponse({ status: 404, description: 'Servicio no encontrado' })
  async verificarDisponibilidad(@Param('id', ParseIntPipe) id: number) {
    try {
      const disponible = await this.servicioService.verificarDisponibilidad(id);
      return { disponible };
    } catch (error) {
      throw new HttpException(
        'Error al verificar disponibilidad',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id/precio')
  @ApiOperation({ summary: 'Actualizar el precio de un servicio' })
  @ApiResponse({ status: 200, description: 'Precio actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Servicio no encontrado' })
  async actualizarPrecio(
    @Param('id', ParseIntPipe) id: number,
    @Body('precio', ParseIntPipe) nuevoPrecio: number,
  ) {
    try {
      await this.servicioService.actualizarPrecio(id, nuevoPrecio);
      return { message: 'Precio actualizado exitosamente' };
    } catch (error) {
      throw new HttpException('Error al actualizar el precio', HttpStatus.BAD_REQUEST);
    }
  }
}
