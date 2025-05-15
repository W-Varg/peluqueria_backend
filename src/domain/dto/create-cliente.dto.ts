import { PreferenciasCliente } from '../value-objects/preferencias-cliente';

export class CreateClienteDto {
  nombre: string;
  telefono: string;
  email: string;
  preferencias?: PreferenciasCliente;
}
