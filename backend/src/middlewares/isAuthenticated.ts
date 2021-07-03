import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UserController } from "../controllers/UserController";
import { User } from "../entity/User";
import { NotAuthorizedException } from "../exceptions/NotAuthorizedException";
import { UserService } from "../services/UserService";

interface IPayload {
  sub: string;
  id: string;
}

export default async function(request: Request, response: Response, next: NextFunction) {
  const bearerToken = request.headers.authorization;
  
  if(!bearerToken) {
    throw new NotAuthorizedException();
  }
  
  const [, token] = bearerToken.split(" ");
  try {
    const {sub} = verify(token, process.env.JWT_SECRET || "9f7de19309edb4f1970bfcc845146c9c") as IPayload;

    const user = await new UserService().getById(sub);

    request.user = plainToClass(User, user);

    return next();
  } catch(err) {
    console.log(err);
    throw new NotAuthorizedException();
  }
}