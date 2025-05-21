// src/auth/auth.service.ts
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, name, rol, telefono } = registerDto;

    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new ConflictException('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        rol: rol ?? 'CLIENTE',
      },
    });

    if (user.rol === 'CLIENTE') {
      await this.prisma.cliente.create({
        data: {
          usuarioId: user.id,
          telefono: telefono || '',
        },
      });
    }

    return {
      ...user,
      password: undefined,
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
      include: {
        cliente: true,
        empleado: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      id: user.id,
      email: user.email,
      rol: user.rol,
      name: user.name,
    };

    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        rol: user.rol,
        clienteId: user.cliente?.id,
        empleadoId: user.empleado?.id,
      },
    };
  }
}
