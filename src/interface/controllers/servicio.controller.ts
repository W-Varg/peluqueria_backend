import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ServicioService } from '../../application/services/servicio.service';
import { CreateServicioDto } from '../../application/dtos/servicio/create-servicio.dto';
import { Servicio } from '../../domain/entities/servicio';

@Controller('servicios')
export class ServicioController {
  constructor(private readonly servicioService: ServicioService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createServicioDto: CreateServicioDto): Promise<Servicio> {
    return this.servicioService.create(createServicioDto);
  }

  @Get()
  async findAll(): Promise<Servicio[]> {
    return this.servicioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Servicio> {
    return this.servicioService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServicioDto: CreateServicioDto,
  ): Promise<Servicio> {
    return this.servicioService.update(id, updateServicioDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.servicioService.delete(id);
  }
}
