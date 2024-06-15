export class SuccessRO {
  private readonly isSuccess: boolean = true;
  private readonly message: string = 'Success';

  constructor(message = 'Success') {
    this.message = message;
  }
}
