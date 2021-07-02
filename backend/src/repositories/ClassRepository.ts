import { EntityRepository, Repository } from "typeorm";
import { Class } from "../entity/Class";

@EntityRepository(Class)
class ClassRepository extends Repository<Class> {}

export {ClassRepository};