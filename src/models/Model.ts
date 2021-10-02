export abstract class Model<P> {
  readonly props: P

  constructor(props: P) {
    this.props = props
  }
}
