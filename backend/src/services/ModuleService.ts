import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { Module } from "../entity/Module";
import { InvalidRequestException } from "../exceptions/InvalidRequestException";
import { ModuleRepository } from "../repositories/ModuleRepository";
import { ClassService } from "./ClassService";
import { UserService } from "./UserService";

interface ICreateModule {
  name: string,
  description: string,
}

interface IListModuleWithClassesCount {
  module: Module,
  classCount: number
}

class ModuleService {
  async create(name, description) {
    const moduleRepository = getCustomRepository(ModuleRepository);
    if(!name) {
      throw new InvalidRequestException("Name incorrect");
    }

    const moduleAlreadyExists = await moduleRepository.findOne({name});

    if(moduleAlreadyExists) {
      throw new InvalidRequestException("Module already exists");
    }

    const module = moduleRepository.create({name, description});

    await moduleRepository.save(module);

    return classToPlain(module);
  }

  async list() {
    const moduleRepository = getCustomRepository(ModuleRepository);
    const classService = new ClassService();

    const modules = await moduleRepository.find({order: {name: "ASC"}});

    let modulesCount: IListModuleWithClassesCount[] = [];

    for(let module of modules) {
      let moduleCount = {
        module: module,
        classCount: await classService.countClassesWithinModule(module.id),
      } as IListModuleWithClassesCount;
  
      
      modulesCount.push(moduleCount);
    }

    return classToPlain(modulesCount);
  }

  async getOne(id: string) {
    const moduleRepository = getCustomRepository(ModuleRepository);

    const module = await moduleRepository.findOne({id});

    if(!module) {
      throw new InvalidRequestException("Module not found");
    }

    return classToPlain(module);
  }

  async update(id: string, name: string, description: string) {
    const moduleRepository = getCustomRepository(ModuleRepository);

    let module = await moduleRepository.findOne({id});

    if(!module) {
      throw new InvalidRequestException("Module not found");
    }

    module.name = name;
    module.description = description;

    module = moduleRepository.merge(module);

    await moduleRepository.update({id}, module);

    return classToPlain(module);
  }

  async delete(id: string) {
    const moduleRepository = getCustomRepository(ModuleRepository);

    const module = await moduleRepository.findOne({id});

    if(!module) {
      throw new InvalidRequestException("Module not found");
    }

    const result = await moduleRepository.delete(id);

    return true;
  }
}

export {ModuleService};