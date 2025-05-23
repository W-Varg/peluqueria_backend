import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { Rol } from '@prisma/client';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/guards/decorators/roles.decorator';
import { EmpleadosService } from 'src/shared/domain/empleados/empleados.service';
import { EmpleadoResponseDto } from 'src/shared/domain/empleados/dto/empleado.model';
import { CreateEmpleadoDto } from 'src/shared/domain/empleados/dto/create-empleado.dto';
import { UpdateEmpleadoDto } from 'src/shared/domain/empleados/dto/update-empleado.dto';

@ApiTags('empleados')
@ApiBearerAuth()
@Controller('empleados')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmpleadosController {
  constructor(private readonly empleadosService: EmpleadosService) {}

  @Post()
  @Roles(Rol.ADMIN)
  @ApiResponse({
    status: 201,
    description: 'Empleado creado exitosamente',
    type: EmpleadoResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Usuario o sucursal no encontrada' })
  create(@Body() createEmpleadoDto: CreateEmpleadoDto) {
    return this.empleadosService.create(createEmpleadoDto);
  }

  @Get()
  @Roles(Rol.ADMIN, Rol.EMPLEADO)
  @ApiResponse({
    status: 200,
    description: 'Lista de empleados',
    type: [EmpleadoResponseDto],
  })
  findAll() {
    return this.empleadosService.findAll();
  }

  @Get(':id')
  @Roles(Rol.ADMIN, Rol.EMPLEADO)
  @ApiResponse({
    status: 200,
    description: 'Empleado encontrado',
    type: EmpleadoResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Empleado no encontrado' })
  findOne(@Param('id') id: string) {
    return this.empleadosService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Rol.ADMIN)
  @ApiResponse({
    status: 200,
    description: 'Empleado actualizado',
    type: EmpleadoResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Empleado no encontrado' })
  update(@Param('id') id: string, @Body() updateEmpleadoDto: UpdateEmpleadoDto) {
    return this.empleadosService.update(+id, updateEmpleadoDto);
  }

  @Delete(':id')
  @Roles(Rol.ADMIN)
  @ApiResponse({ status: 200, description: 'Empleado eliminado' })
  @ApiResponse({ status: 404, description: 'Empleado no encontrado' })
  @ApiResponse({
    status: 400,
    description: 'No se puede eliminar, tiene reservas asociadas',
  })
  remove(@Param('id') id: string) {
    return this.empleadosService.remove(+id);
  }
}
