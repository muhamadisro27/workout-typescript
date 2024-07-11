import express from "express";
import { AddressController } from "../controller/address-controller";
import { ContactController } from "../controller/contact-controller";
import { UserController } from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

apiRouter.get("/api/users/current", UserController.get);
apiRouter.patch("/api/users/current", UserController.update);
apiRouter.delete("/api/users/current", UserController.logout);

apiRouter.post("/api/contacts", ContactController.create);
apiRouter.get("/api/contacts/:contactId(\\d+)", ContactController.get);
apiRouter.put("/api/contacts/:contactId(\\d+)", ContactController.update);
apiRouter.delete("/api/contacts/:contactId(\\d+)", ContactController.delete);
apiRouter.get("/api/contacts/", ContactController.search);

apiRouter.post("/api/contacts/:contactId(\\d+)/addresses/", AddressController.create)
apiRouter.get("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)/", AddressController.get)
apiRouter.put("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)/", AddressController.update)
apiRouter.delete("/api/contacts/:contactId(\\d+)/addresses/:addressId(\\d+)/", AddressController.delete)
apiRouter.get("/api/contacts/:contactId(\\d+)/addresses/", AddressController.list)