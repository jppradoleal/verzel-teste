import { HttpException } from "./HttpException";

class InvalidRequestException extends HttpException {
  constructor(message: string) {
    super(message, 406);

    Object.setPrototypeOf(this, InvalidRequestException.prototype)
  }
}

export {InvalidRequestException};