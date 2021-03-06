import { Request, Response } from "express";
import { NotAuthorizedException } from "../exceptions/NotAuthorizedException";
import { UserService } from "../services/UserService";

class UserController {
  async create(request: Request, response: Response) {
    const {email, name, password} = request.body;

    const userService = new UserService();

    const user = await userService.create({
      email,
      name,
      isAdmin: false,
      password
    });

    response.status(201).json(user);
  }

  async list(request: Request, response: Response) {
    const userService = new UserService();
    const users = await userService.list();

    response.status(200).json(users);
  }

  async authenticate(request: Request, response: Response) {
    const {email, password} = request.body;

    const userService = new UserService();

    const token = await userService.authenticate({
      email,
      password,
    });

    response.status(200).json(token);
  }
}

export {UserController}