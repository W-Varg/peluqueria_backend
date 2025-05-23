import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateSucursalDto, UpdateSucursalDto } from 'src/shared/domain/sucursal/dto/sucursal.dto';
import { SucursalesService } from 'src/shared/domain/sucursal/sucursal.service';

@ApiTags('sucursales')
@ApiBearerAuth()
@Controller('sucursales')
@UseGuards(JwtAuthGuard)
export class SucursalesController {
  constructor(private readonly sucursalesService: SucursalesService) {}

  @Post()
  // @UseGuards(SucursalAdminGuard)
  create(@Body() createSucursalDto: CreateSucursalDto) {
    return this.sucursalesService.create(createSucursalDto);
  }

  @Get()
  findAll() {
    return this.sucursalesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sucursalesService.findOne(+id);
  }

  @Get(':id/empleados')
  getEmpleados(@Param('id') id: string) {
    return this.sucursalesService.getEmpleadosBySucursal(+id);
  }

  @Patch(':id')
  // @UseGuards(SucursalAdminGuard)
  update(@Param('id') id: string, @Body() updateSucursalDto: UpdateSucursalDto) {
    return this.sucursalesService.update(+id, updateSucursalDto);
  }

  @Delete(':id')
  // @UseGuards(SucursalAdminGuard)
  remove(@Param('id') id: string) {
    return this.sucursalesService.remove(+id);
  }
}
