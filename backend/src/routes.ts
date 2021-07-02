import { Router } from "express";
import { ModuleController } from "./controllers/ModuleController";
import { UserController } from "./controllers/UserController";
import isAuthenticated from "./middlewares/isAuthenticated";

const router = Router();

const userController = new UserController();
const moduleController = new ModuleController();

router.get("/users", userController.list);
router.post("/users/create", isAuthenticated, userController.create);

router.post("/login", userController.authenticate);

router.get("/modules", moduleController.list);
router.post("/modules/create", moduleController.create);
router.put("/modules/:id/edit", moduleController.update);
router.delete("/modules/:id/delete", moduleController.delete);

export { router };