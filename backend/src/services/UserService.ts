import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { InvalidRequestException } from "../exceptions/InvalidRequestException";
import { UserRepository } from "../repositories/UserRepository";

interface IUserRequest {
  email: string;
  name: string;
  isAdmin: boolean;
  password: string;
}

class UserService {
  async create({email, name, isAdmin = false, password}: IUserRequest) {
    const userRepository = getCustomRepository(UserRepository);

    if(!email) {
      throw new InvalidRequestException("Email incorrect");
    }

    const userAlreadyExists = await userRepository.findOne({email});

    console.log(userAlreadyExists);

    if(userAlreadyExists) {
      throw new InvalidRequestException("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = userRepository.create({
      name, 
      email, 
      isAdmin: isAdmin, 
      password: passwordHash,
    })

    await userRepository.save(user);

    return classToPlain(user);
  }

  async list() {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find();

    return classToPlain(users);
  }
}

export {UserService};