import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { NotAuthorizedException } from "../exceptions/NotAuthorizedException";

interface IPayload {
  sub: string;
}

export default function(request: Request, response: Response, next: NextFunction) {
  const bearerToken = request.headers.authorization;

  if(!bearerToken) {
    throw new NotAuthorizedException();
  }

  const [, token] = bearerToken.split(" ");

  try {
    const {sub} = verify(token, process.env.JWT_SECRET || "9f7de19309edb4f1970bfcc845146c9c") as IPayload;

    return next();
  } catch(err) {
    throw new NotAuthorizedException();
  }
}