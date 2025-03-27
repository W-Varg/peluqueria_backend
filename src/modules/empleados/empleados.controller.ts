import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmpleadosService } from './empleados.service';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
// import { EmpleadoResponseDto } from './dto/empleado-response.dto';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { Roles } from '../auth/decorators/roles.decorator';
import { Rol } from '@prisma/client';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/guards/decorators/roles.decorator';
import { EmpleadoResponseDto } from './dto/empleado.model';

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
