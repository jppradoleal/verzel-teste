import { compare, hash } from "bcryptjs";
import { classToPlain } from "class-transformer";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { User } from "../entity/User";
import { InvalidRequestException } from "../exceptions/InvalidRequestException";
import { UserRepository } from "../repositories/UserRepository";

interface ICreateUserRequest {
  email: string;
  name: string;
  isAdmin: boolean;
  password: string;
}

interface IAuthenticateUserRequest {
  email: string;
  password: string;
}

class UserService {
  async create({email, name, isAdmin = false, password}: ICreateUserRequest) {
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

  async getById(id: string) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(id);

    return classToPlain(user);
  }

  async authenticate({email, password}: IAuthenticateUserRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      email
    });

    if(!user) {
      throw new InvalidRequestException("Email/Password Incorrect");
    }

    const hasMatched = await compare(password, user.password);

    if(!hasMatched) {
      throw new InvalidRequestException("Email/Password Incorrect");
    }

    const token = sign(
      {
        email: user.email,
        admin: user.isAdmin,
      },
      process.env.JWT_SECRET || "9f7de19309edb4f1970bfcc845146c9c",
      {
        subject: user.id,
        expiresIn: "1d"
      }
    );

    return token;
  }
}

export {UserService};