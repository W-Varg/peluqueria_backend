// src/auth/interfaces/jwt-payload.interface.ts
export interface JwtPayload {
  id: number; // Identificador único del usuario
  email: string; // Correo electrónico del usuario
  name: string; // Nombre del usuario

  // Campos opcionales que puedes agregar
  iat?: number; // Timestamp de emisión del token
  exp?: number; // Timestamp de expiración del token
  role?: string; // Rol del usuario (opcional)
}

// Ejemplo de uso en el servicio de autenticación
export function createJwtPayload(user: {
  id: number;
  email: string;
  name: string;
  role?: string;
}): JwtPayload {
  const payload: JwtPayload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role || 'CLIENTE', // Rol por defecto
  };

  return payload;
}

// Ejemplo de decodificación de token
export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    // En un escenario real, usarías jwt.verify() o similar
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString('utf-8'));
    return payload as JwtPayload;
  } catch (error) {
    console.error('Error decodificando token:', error);
    return null;
  }
}

// Ejemplo de Guard personalizado basado en roles
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;

    // Verificar si el usuario tiene un rol permitido
    return this.allowedRoles.includes(user?.role || '');
  }
}

//   // Ejemplo de uso del RoleGuard
//   @UseGuards(AuthGuard('jwt'), new RoleGuard(['ADMIN', 'EMPLEADO']))
//   @Post('crear-reserva')
//   crearReserva(@Body() reservaDto: ReservaDto) {
//     // Solo accesible para ADMIN y EMPLEADO
//   }
