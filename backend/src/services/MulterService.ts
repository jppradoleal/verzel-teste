import { NextFunction, Request, Response } from "express";
import multer, { FileFilterCallback,  } from "multer";
import path from 'path';

const storage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => {
    console.log(file.filename);
    console.log(file.fieldname)
    callback(null, './public/uploads/')
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, destination: string) => void
  ) => {
    callback(null, `${file.filename}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

export default multer({storage});