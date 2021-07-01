import "reflect-metadata";
import cors from "cors";
import express, {Request, Response, NextFunction } from "express"; 
import "express-async-errors";

import "./database";
import { router } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  })
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server listening on ${port}`));