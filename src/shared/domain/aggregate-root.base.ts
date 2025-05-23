export abstract class AggregateRoot<T> {
  protected readonly props: T;

  protected constructor(props: T) {
    this.props = props;
  }

  public equals(other: AggregateRoot<T>): boolean {
    if (!(other instanceof AggregateRoot)) {
      return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}
