import { Router } from "express";
import { ClassController } from "./controllers/ClassController";
import { ModuleController } from "./controllers/ModuleController";
import { UserController } from "./controllers/UserController";
import ensureAdmin from "./middlewares/ensureAdmin";
import isAuthenticated from "./middlewares/isAuthenticated";
import upload from "./services/MulterService";

const router = Router();

const userController = new UserController();
const moduleController = new ModuleController();
const classController = new ClassController();

// #region Users related 
router.get("/users", userController.list);
router.post("/users/create", isAuthenticated, ensureAdmin, userController.create);

router.post("/login", userController.authenticate);
// #endregion

//#region Modules related 
router.get("/modules", moduleController.list);
router.get("/modules/:id", moduleController.getById)
router.post("/modules/create", isAuthenticated, ensureAdmin, moduleController.create);
router.put("/modules/:id/edit", isAuthenticated, ensureAdmin, moduleController.update);
router.delete("/modules/:id/delete", isAuthenticated, ensureAdmin, moduleController.delete);
//#endregion

//#region Class related
router.get("/classes", classController.list);
router.get("/classes/:id", classController.getById);
router.get("/modules/:module/classes", classController.listByModule)
router.post("/classes/create", isAuthenticated, ensureAdmin, upload.single("thumbnail"), classController.create);
router.put("/classes/:id/edit", isAuthenticated, ensureAdmin, classController.update);
router.delete("/classes/:id/delete", isAuthenticated, ensureAdmin, classController.delete);
//#endregion

export { router };