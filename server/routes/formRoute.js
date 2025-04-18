import express from "express";

import { createForm, deleteForm, getForms, updateForm } from "../controllers/formController.js";

const router = express.Router();

router.get("/", getForms);
router.post("/", createForm);
router.patch("/:id", updateForm);
router.delete("/:id", deleteForm);

export default router;