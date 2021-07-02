import { Router } from "express";
import { ClassController } from "./controllers/ClassController";
import { ModuleController } from "./controllers/ModuleController";
import { UserController } from "./controllers/UserController";
import isAuthenticated from "./middlewares/isAuthenticated";

const router = Router();

const userController = new UserController();
const moduleController = new ModuleController();
const classController = new ClassController();

// #region Users related 
router.get("/users", userController.list);
router.post("/users/create", isAuthenticated, userController.create);

router.post("/login", userController.authenticate);
// #endregion

//#region Modules related 
router.get("/modules", moduleController.list);
router.post("/modules/create", moduleController.create);
router.put("/modules/:id/edit", moduleController.update);
router.delete("/modules/:id/delete", moduleController.delete);
//#endregion

//#region Class related
router.get("/classes", classController.list);
router.post("/classes/create", classController.create);
router.put("/classes/:id/edit", classController.update);
router.delete("/classes/:id/delete", classController.delete);
//#endregion

export { router };