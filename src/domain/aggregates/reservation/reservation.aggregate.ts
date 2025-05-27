import { PrismaService } from 'src/infrastructure/persistence/prisma/prisma.service';
import { AggregateRoot } from '../../../shared/domain/aggregate-root.base';
import { DomainError } from '../../../shared/domain/domain.error';
import { ReservationDateVO } from './value-objects/reservation-date.vo';
import { ReservationStatus, ReservationStatusVO } from './value-objects/reservation-status.vo';
import { Prisma } from '@prisma/client';
import { Reserva } from 'src/shared/domain/reserva/reserva';
import { PreferenciasCliente } from 'src/domain/value-objects/preferencias-cliente';
import { Cliente } from '../client/entities/cliente';
import { Servicio } from '../service/entities/servicio';
import { Duracion } from 'src/domain/value-objects/duracion';
import { Precio } from 'src/domain/value-objects/precio';
import { Horario } from 'src/domain/value-objects/horario';
import { EstadoReserva } from 'src/domain/value-objects/estado-reserva';
import { CreateReservaDto } from 'src/shared/domain/reserva/dto/create-reserva.dto';

type PrismaReservaWithRelations = Prisma.ReservaGetPayload<{
  include: {
    cliente: {
      include: {
        usuario: true;
      };
    };
    servicio: true;
    empleado: {
      include: {
        usuario: true;
      };
    };
  };
}>;

export interface ReservationProps {
  id: string;
  clientId: string;
  serviceId: string;
  date: ReservationDateVO;
  status: ReservationStatusVO;
  createdAt: Date;
  updatedAt: Date;
}

export class ReservationAggregate extends AggregateRoot<ReservationProps> {
  private constructor(
    props: ReservationProps,
    private prisma: PrismaService = new PrismaService(),
  ) {
    super(props);
  }

  public static create(
    id: string,
    clientId: string,
    serviceId: string,
    date: Date,
    duration: number,
  ): ReservationAggregate {
    const reservationDate = ReservationDateVO.create(date, duration);
    const status = ReservationStatusVO.create(ReservationStatus.PENDING);
    const now = new Date();

    return new ReservationAggregate({
      id,
      clientId,
      serviceId,
      date: reservationDate,
      status,
      createdAt: now,
      updatedAt: now,
    });
  }

  // Getters
  public get id(): string {
    return this.props.id;
  }

  public get clientId(): string {
    return this.props.clientId;
  }

  public get serviceId(): string {
    return this.props.serviceId;
  }

  public get date(): ReservationDateVO {
    return this.props.date;
  }

  public get status(): ReservationStatusVO {
    return this.props.status;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Métodos de negocio
  public confirm(): void {
    if (!this.status.canBeConfirmed()) {
      throw new DomainError('No se puede confirmar la reserva en su estado actual');
    }
    this.props.status = ReservationStatusVO.create(ReservationStatus.CONFIRMED);
    this.props.updatedAt = new Date();
  }

  public cancel(): void {
    if (!this.status.canBeCancelled()) {
      throw new DomainError('No se puede cancelar la reserva en su estado actual');
    }
    this.props.status = ReservationStatusVO.create(ReservationStatus.CANCELLED);
    this.props.updatedAt = new Date();
  }

  public complete(): void {
    if (!this.status.canBeCompleted()) {
      throw new DomainError('No se puede completar la reserva en su estado actual');
    }
    this.props.status = ReservationStatusVO.create(ReservationStatus.COMPLETED);
    this.props.updatedAt = new Date();
  }

  public markAsNoShow(): void {
    if (!this.status.canBeMarkedAsNoShow()) {
      throw new DomainError('No se puede marcar la reserva como no show en su estado actual');
    }
    this.props.status = ReservationStatusVO.create(ReservationStatus.NO_SHOW);
    this.props.updatedAt = new Date();
  }

  public overlapsWithReservation(other: ReservationAggregate): boolean {
    if (this.id === other.id) {
      return false; // Una reserva no puede solaparse consigo misma
    }
    return this.date.overlaps(other.date);
  }

  // Método para actualizar la fecha/hora de la reserva
  public updateDateTime(newDate: Date, newDuration: number): void {
    if (!this.status.isPending()) {
      throw new DomainError('Solo se puede modificar la fecha de reservas pendientes');
    }
    this.props.date = ReservationDateVO.create(newDate, newDuration);
    this.props.updatedAt = new Date();
  }

  private mapReservaToEntity(reserva: PrismaReservaWithRelations): Reserva {
    // Create Cliente entity
    const clienteProps = {
      nombre: reserva.cliente.usuario.name,
      telefono: reserva.cliente.telefono || '',
      email: reserva.cliente.usuario.email,
      usuarioId: reserva.cliente.usuario.id,
      preferencias: PreferenciasCliente.create({
        horario: [],
        estilista: [],
        servicios: [],
      }),
      estado: reserva.cliente.estado,
      visitas: reserva.cliente.visitasTotal,
      ultimaVisita: reserva.cliente.ultimaVisita,
    };
    const cliente = Cliente.create(clienteProps, reserva.cliente.id.toString());

    // Create Servicio entity
    const servicio = Servicio.create(
      reserva.servicio.id,
      reserva.servicio.nombre,
      new Duracion(reserva.servicio.duracion),
      new Precio(reserva.servicio.precio),
      reserva.servicio.descripcion,
    );

    // Create Horario value object
    const horaInicio = new Date(reserva.hora);
    const horaFin = new Date(horaInicio.getTime() + reserva.servicio.duracion * 60000);
    const horario = Horario.create(
      reserva.fecha,
      `${horaInicio.getHours().toString().padStart(2, '0')}:${horaInicio.getMinutes().toString().padStart(2, '0')}`,
      `${horaFin.getHours().toString().padStart(2, '0')}:${horaFin.getMinutes().toString().padStart(2, '0')}`,
    );

    // Create Reserva entity
    return Reserva.create(
      {
        cliente: cliente,
        servicio: servicio,
        horario: horario,
        estado: reserva.estado as EstadoReserva,
      },
      reserva.id.toString(),
    );
  }

  private convertToDate(fecha: Date, horaStr: Date): Date {
    const fechaDate: Date = new Date(fecha);
    const horaDate: Date = new Date(horaStr);
    const [hours, minutes] = [horaDate.getHours(), horaDate.getMinutes()];
    return new Date(
      fechaDate.getFullYear(),
      fechaDate.getMonth(),
      fechaDate.getDate(),
      hours,
      minutes,
    );
  }

  async crear(createReservaDto: CreateReservaDto) {
    const hora = this.convertToDate(createReservaDto.fecha, createReservaDto.horaInicio);

    return this.prisma.reserva.create({
      data: {
        fecha: createReservaDto.fecha,
        hora: hora,
        clienteId: createReservaDto.clienteId,
        empleadoId: createReservaDto.empleadoId,
        servicioId: createReservaDto.servicioId,
        estado: createReservaDto.estado,
      },
      include: {
        cliente: {
          include: {
            usuario: true,
          },
        },
        empleado: {
          include: {
            usuario: true,
          },
        },
        servicio: true,
      },
    });
  }

  async findAll() {
    return this.prisma.reserva.findMany({
      include: {
        cliente: {
          include: {
            usuario: true,
          },
        },
        empleado: {
          include: {
            usuario: true,
          },
        },
        servicio: true,
      },
    });
  }

  async reservasCliente(id: number) {
    const result = await this.prisma.reserva.findMany({
      where: { clienteId: id },
      include: {
        cliente: {
          include: {
            usuario: true,
          },
        },
        empleado: {
          include: {
            usuario: true,
          },
        },
        servicio: true,
      },
    });

    return result;
  }
}
