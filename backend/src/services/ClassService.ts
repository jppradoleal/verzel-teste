import { classToPlain, plainToClass } from "class-transformer";
import { Module } from "../entity/Module";
import { getCustomRepository } from "typeorm";
import { InvalidRequestException } from "../exceptions/InvalidRequestException";
import { ClassRepository } from "../repositories/ClassRepository";
import { ModuleService } from "./ModuleService";

interface ICreateClassRequest {
  name: string,
  moduleId: string,
  start_date: Date,
}

interface IUpdateClassRequest {
  name?: string,
  moduleId?: string,
  start_date?: Date,
}

class ClassService {
  async create({name, moduleId, start_date}: ICreateClassRequest) {
    const moduleService = new ModuleService();
    const classRepository = getCustomRepository(ClassRepository);

    const plainModule = await moduleService.getOne(moduleId);

    const module = plainToClass(Module, plainModule);

    console.log(module);

    const classExists = await classRepository.findOne({name});
    console.log(classExists);
    
    if(classExists) {
      throw new InvalidRequestException("Class already exists");
    }
    
    const createdClass = classRepository.create({
      name,
      start_date
    });

    console.log(createdClass);

    createdClass.module = module;

    await classRepository.save(createdClass);

    return classToPlain(createdClass);
  }

  async list() {
    const classRepository = getCustomRepository(ClassRepository);

    const classes = classRepository.find({relations: ["module"]});

    return classToPlain(classes);
  }

  async listByModule(module: string) {
    const classRepository = getCustomRepository(ClassRepository);

    const classes = classRepository.find({where: {module}, relations: ["module"]});

    return classToPlain(classes);
  }

  async getOne(id: string) {
    const classRepository = getCustomRepository(ClassRepository);

    const receivedClass = classRepository.findOne({where: {id}, relations: ['module']});

    return classToPlain(receivedClass);
  }

  async update(id: string, updatedClass: IUpdateClassRequest) {
    const classRepository = getCustomRepository(ClassRepository);
    const moduleService = new ModuleService();

    let foundClass = await classRepository.findOne({id});

    if(!foundClass) {
      throw new InvalidRequestException("Class not found");
    }

    if(updatedClass.moduleId) {
      const module = await moduleService.getOne(updatedClass.moduleId);

      foundClass.module = plainToClass(Module, module);
    }

    foundClass = await classRepository.merge(foundClass, updatedClass);

    await classRepository.update({id}, foundClass);

    return classToPlain(foundClass);
  }

  async delete(id) {
    const classRepository = getCustomRepository(ClassRepository);

    const foundClass = await classRepository.findOne({id});

    if(!foundClass) {
      throw new InvalidRequestException("Class not found");
    }

    const result = await classRepository.delete(id);

    return true;
  }
}

export {ClassService};