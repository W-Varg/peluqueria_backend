import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/database/database.service';

@Injectable()
export class SucursalAdminGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new ForbiddenException('Token no proporcionado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      // Verificar si el usuario es ADMIN
      if (payload.rol === 'ADMIN') {
        return true;
      }

      // Para operaciones que requieren ID de sucursal (update/delete)
      const sucursalId = request.params.id;
      if (sucursalId) {
        const esEmpleadoDeSucursal = await this.prisma.empleado.findFirst({
          where: {
            usuarioId: payload.id,
            sucursalId: parseInt(sucursalId),
          },
        });

        if (!esEmpleadoDeSucursal) {
          throw new ForbiddenException('No tienes permisos para esta sucursal');
        }
      }

      return true;
    } catch {
      throw new ForbiddenException('Token inválido o sin permisos');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
