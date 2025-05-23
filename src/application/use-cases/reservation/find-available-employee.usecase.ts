import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class EmployeeAssignmentService {
  constructor(private prisma: PrismaService) {}

  async findAvailableEmployee(fecha: Date, hora: Date, servicioId: number): Promise<number | null> {
    // Obtener el servicio para conocer su duración
    const servicio = await this.prisma.servicio.findUnique({
      where: { id: servicioId },
    });

    if (!servicio) {
      return null;
    }

    const horaFin = new Date(hora.getTime() + servicio.duracion * 60000);

    // Obtener todos los empleados
    const empleados = await this.prisma.empleado.findMany();

    // Para cada empleado, verificar si está disponible en el horario solicitado
    for (const empleado of empleados) {
      const reservasSuperpuestas = await this.prisma.reserva.findMany({
        where: {
          AND: [
            { empleadoId: empleado.id },
            { fecha },
            {
              OR: [
                {
                  AND: [
                    { hora: { lte: hora } },
                    {
                      hora: {
                        gt: new Date(hora.getTime() - servicio.duracion * 60000),
                      },
                    },
                  ],
                },
                {
                  AND: [{ hora: { gte: hora } }, { hora: { lt: horaFin } }],
                },
              ],
            },
          ],
        },
      });

      if (reservasSuperpuestas.length === 0) {
        return empleado.id;
      }
    }

    return null;
  }
}
