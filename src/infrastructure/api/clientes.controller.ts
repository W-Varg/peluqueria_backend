import { Controller, Get, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ClienteService } from '../../domain/aggregates/repository/client.repository';

@Controller('clientes')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClientesController {
  constructor(private readonly clienteService: ClienteService) {}

  //   @Post()
  //   // @Roles(Rol.ADMIN)
  //   create(@Body() createReservaDto: CreateReservaDto) {
  //     return this.clienteService.create(createReservaDto);
  //   }

  @Get()
  // @Roles(Rol.ADMIN)
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  // @Roles(Rol.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.findOne(id.toString());
  }

  //   @Patch(':id')
  //   // @Roles(Rol.ADMIN)
  //   update(@Param('id', ParseIntPipe) id: number, @Body() updateReservaDto: UpdateReservaDto) {
  //     return this.clienteService.update(id.toString(), updateReservaDto);
  //   }

  @Delete(':id')
  // @Roles(Rol.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.remove(id.toString());
  }
}
