import { Router } from "express";
import { getDashboardMetrics } from "../controllers/dashboardController";

const router = Router();
// http://blabla/dashboard
router.get("/", getDashboardMetrics);

export default router;
