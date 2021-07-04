import { Request, Response } from "express";
import { InvalidRequestException } from "../exceptions/InvalidRequestException";
import { ModuleService } from "../services/ModuleService";

class ModuleController {
  async create(request: Request, response: Response) {
    const {name, description} = request.body;

    const moduleService = new ModuleService();

    const module = await moduleService.create(name, description);

    response.status(201).json(module);
  }

  async list(request: Request, response: Response) {
    const moduleService = new ModuleService();

    const modules = await moduleService.list();

    response.status(200).json(modules)
  }

  async getById(request: Request, response: Response) {
    const {id} = request.params;

    const moduleService = new ModuleService();

    const module = await moduleService.getOne(id);
  
    response.status(200).json(module);
  }

  async update(request: Request, response: Response) {
    const {id} = request.params;
    const {name} = request.body;
    
    if(!id) {
      throw new InvalidRequestException("Id invalid");
    }

    const moduleService = new ModuleService();

    const module = await moduleService.update(id, name);

    response.status(202).json(module);
  }

  async delete(request: Request, response: Response) {
    const {id} = request.params;

    if(!id) {
      throw new InvalidRequestException("Id invalid");
    }

    const moduleService = new ModuleService();

    await moduleService.delete(id);

    response.status(202).json("Registry deleted");
  }
}

export {ModuleController};