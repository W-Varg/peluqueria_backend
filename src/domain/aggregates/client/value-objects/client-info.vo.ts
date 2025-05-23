import { ValueObject } from '../../../../shared/domain/value-object.base';
import { DomainError } from '../../../../shared/domain/domain.error';

interface ClientInfoProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class ClientInfoVO extends ValueObject<ClientInfoProps> {
  private constructor(props: ClientInfoProps) {
    super(props);
  }

  public static create(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
  ): ClientInfoVO {
    if (!firstName || firstName.trim().length < 2) {
      throw new DomainError('El nombre debe tener al menos 2 caracteres');
    }

    if (!lastName || lastName.trim().length < 2) {
      throw new DomainError('El apellido debe tener al menos 2 caracteres');
    }

    if (!this.isValidEmail(email)) {
      throw new DomainError('El email no es válido');
    }

    if (!this.isValidPhone(phone)) {
      throw new DomainError('El número de teléfono no es válido');
    }

    return new ClientInfoVO({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
    });
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private static isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    return phoneRegex.test(phone);
  }

  public get fullName(): string {
    return `${this.props.firstName} ${this.props.lastName}`;
  }

  public get firstName(): string {
    return this.props.firstName;
  }

  public get lastName(): string {
    return this.props.lastName;
  }

  public get email(): string {
    return this.props.email;
  }

  public get phone(): string {
    return this.props.phone;
  }
}
