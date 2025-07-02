import express from 'express'
const router=express.Router();

import { login, signup } from '../controller/auth.js';
import { loginValidation, signupValidation } from '../middleware/loginProtect.js';


router.post('/signUp',signupValidation,signup);
router.post('/login',loginValidation,login);
export default router;
