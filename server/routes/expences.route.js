import { Router } from "express";
import { deleteExpense, getExpences, postExpence } from "../controllers/expences.controller.js";

const router=Router();

router.get("",getExpences);
router.post("",postExpence);
router.delete("/:expenseId",deleteExpense);


export default router;
