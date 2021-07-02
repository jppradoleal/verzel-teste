import { Request, Response } from "express";
import { InvalidRequestException } from "../exceptions/InvalidRequestException";
import { ModuleService } from "../services/ModuleService";
import { UserService } from "../services/UserService";

class ModuleController {
  async create(request: Request, response: Response) {
    const {name} = request.body;

    const moduleService = new ModuleService();

    const module = await moduleService.create(name);

    return response.status(201).json(module);
  }

  async list(request: Request, response: Response) {
    const moduleService = new ModuleService();

    const modules = await moduleService.list();

    response.status(200).json(modules)
  }

  async update(request: Request, response: Response) {
    const {id} = request.params;
    const {name} = request.body;
    
    if(!id) {
      throw new InvalidRequestException("Id invalid");
    }

    const moduleService = new ModuleService();

    const module = await moduleService.update(id, name);

    response.status(200).json(module);
  }

  async delete(request: Request, response: Response) {
    const {id} = request.params;

    if(!id) {
      throw new InvalidRequestException("Id invalid");
    }

    const moduleService = new ModuleService();

    const result = await moduleService.delete(id);

    response.status(200).json(result);
  }
}

export {ModuleController};