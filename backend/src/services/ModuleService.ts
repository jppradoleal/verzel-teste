import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { InvalidRequestException } from "../exceptions/InvalidRequestException";
import { ModuleRepository } from "../repositories/ModuleRepository";

class ModuleService {
  async create(name) {
    const moduleRepository = getCustomRepository(ModuleRepository);
    if(!name) {
      throw new InvalidRequestException("Name incorrect");
    }

    const moduleAlreadyExists = await moduleRepository.findOne({name});

    if(moduleAlreadyExists) {
      throw new InvalidRequestException("Module already exists");
    }

    const module = moduleRepository.create({name});

    await moduleRepository.save(module);

    return classToPlain(module);
  }

  async list() {
    const moduleRepository = getCustomRepository(ModuleRepository);

    const modules = await moduleRepository.find();

    return classToPlain(modules);
  }

  async update(id: string, name: string) {
    const moduleRepository = getCustomRepository(ModuleRepository);

    let module = await moduleRepository.findOne({id});

    module.name = name;

    module = moduleRepository.merge(module);

    await moduleRepository.update({id}, module);

    return module;
  }

  async delete(id: string) {
    const moduleRepository = getCustomRepository(ModuleRepository);

    const result = await moduleRepository.delete({id});

    return result.affected > 0;
  }
}

export {ModuleService};