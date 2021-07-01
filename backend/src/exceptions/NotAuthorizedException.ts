import { HttpException } from "./HttpException";

class NotAuthorizedException extends HttpException {
  constructor() {
    super("Not authorized", 401);

    Object.setPrototypeOf(this, NotAuthorizedException.prototype)
  }
}

export {NotAuthorizedException};