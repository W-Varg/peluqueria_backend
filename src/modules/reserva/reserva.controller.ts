import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('reservas')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  // @Roles(Rol.ADMIN)
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }

  @Post('public')
  // @Roles(Rol.ADMIN)
  publicReserva(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }

  @Get()
  // @Roles(Rol.ADMIN)
  findAll() {
    return this.reservaService.findAll();
  }

  @Get(':id')
  // @Roles(Rol.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.findOne(id.toString());
  }

  @Patch(':id')
  // @Roles(Rol.ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservaService.update(id.toString(), updateReservaDto);
  }

  @Delete(':id')
  // @Roles(Rol.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.remove(id.toString());
  }

  /* --------------------------------------------- servicioes para cliente -------------------------------------------- */
  @Get('cliente/:id')
  // @Roles(Rol.ADMIN)
  reservasCliente(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.reservasCliente(id);
  }

  @Put(':id/cancelar')
  // @Roles(Rol.ADMIN)
  cancelarReserva(@Param('id', ParseIntPipe) id: number) {
    return this.reservaService.cancelarReserva(id.toString());
  }
}
