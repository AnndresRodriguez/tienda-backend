import {Router} from 'express';
import {TokenValidation} from "../libs/verifytoken";

const router: Router = Router();

import { profile, signIn, signUp } from "../controllers/auth.controller";

router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/profile", TokenValidation, profile);

export default router;