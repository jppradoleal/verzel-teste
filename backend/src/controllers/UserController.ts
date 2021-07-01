import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
  async create(request: Request, response: Response) {
    console.log(request.body);
    const {email, name, admin, password} = request.body;

    
    const userService = new UserService();

    const user = await userService.create({
      email,
      name,
      isAdmin: admin,
      password
    });

    return response.status(201).json(user);
  }

  async list(request: Request, response: Response) {
    const userService = new UserService();
    const users = await userService.list();

    response.status(200).json(users);
  }
}

export {UserController}