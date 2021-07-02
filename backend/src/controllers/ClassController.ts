import dayjs from "dayjs";
import { Request, Response } from "express";
import { ClassService } from "../services/ClassService";

class ClassController {
  async create(request: Request, response: Response) {
    const { name, module, start_date } = request.body;

    const formattedDate = dayjs(start_date).toDate();

    const classService = new ClassService();

    const savedClass = await classService.create({
      name,
      moduleId: module,
      start_date: formattedDate,
    });

    response.status(201).json(savedClass);
  }

  async list(request: Request, response: Response) {
    const classService = new ClassService();

    const classes = await classService.list();

    response.status(200).json(classes);
  }

  async update(request: Request, response: Response) {
    const {id} = request.params;
    const {name, start_date, module} = request.body;

    const formattedDate = dayjs(start_date).toDate();

    const classService = new ClassService();

    const updatedClass = await classService.update(id, {name, start_date: formattedDate, moduleId: module})
  
    response.status(200).json(updatedClass);
  }

  async delete(request: Request, response: Response) {
    const {id} = request.params;

    const classService = new ClassService();

    const wasDeleted = await classService.delete(id);

    response.status(200).json(wasDeleted);
  }
}

export { ClassController };
