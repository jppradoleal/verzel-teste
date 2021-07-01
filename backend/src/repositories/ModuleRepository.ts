import { Module } from "../entity/Module";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Module)
class ModuleRepository extends Repository<Module> {}

export {ModuleRepository};