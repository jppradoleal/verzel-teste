import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/User";

@EntityRepository(User)
class ClassRepository extends Repository<User> {}

export {ClassRepository};