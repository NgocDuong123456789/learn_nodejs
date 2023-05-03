import express from "express";

import { getAllUser, updateUser } from "../Controllers/userController";
import { isAuthenticated, isOwner } from "../middleware/index";
import { deleteUser } from "../Controllers/userController";
const router= express.Router();

  router.get("/users", isAuthenticated, getAllUser);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/users/:id", isAuthenticated, isOwner,  updateUser);


  export default router
