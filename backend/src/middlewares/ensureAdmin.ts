import { NextFunction, Request, Response } from "express";
import { NotAuthorizedException } from "../exceptions/NotAuthorizedException";

export default function(request: Request, response: Response, next: NextFunction) {
  if(request.user.isAdmin) {
    next();
  } else {
    throw new NotAuthorizedException();
  }
}