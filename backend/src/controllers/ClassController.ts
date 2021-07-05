import dayjs from "dayjs";
import { Request, Response } from "express";
import { ClassService } from "../services/ClassService";

class ClassController {
  async create(request: Request, response: Response) {
    const { name, module, start_date, description } = request.body;

    console.log(request.file);

    let thumbnail;

    if(request.file) {
      thumbnail = request.file.path;
    }

    const formattedDate = dayjs(start_date).toDate();

    const classService = new ClassService();

    const savedClass = await classService.create({
      name,
      moduleId: module,
      start_date: formattedDate,
      thumbnail: thumbnail || null,
      description: description,
    });

    response.status(201).json(savedClass);
  }

  async list(request: Request, response: Response) {
    const classService = new ClassService();

    const classes = await classService.list();

    response.status(200).json(classes);
  }

  async listByModule(request: Request, response: Response) {
    const classService = new ClassService();
    const {module} = request.params;

    const classes = await classService.listByModule(module);

    response.status(200).json(classes);
  }

  async getById(request: Request, response: Response) {
    const classService = new ClassService();
    const {id} = request.params;

    const receivedClass = await classService.getOne(id);

    response.status(200).json(receivedClass);
  }

  async update(request: Request, response: Response) {
    const {id} = request.params;
    const {name, start_date, module: moduleId, description} = request.body;

    let thumbnail;

    if(request.file) {
      thumbnail = request.file.path;
    }

    const formattedDate = dayjs(start_date).toDate();

    const classService = new ClassService();

    const updatedClass = await classService.update(id, {name, start_date: formattedDate, thumbnail, moduleId, description});
  
    response.status(202).json(updatedClass);
  }

  async delete(request: Request, response: Response) {
    const {id} = request.params;

    const classService = new ClassService();

    await classService.delete(id);

    response.status(202).json("Registry deleted");
  }
}

export { ClassController };
