import {Router} from 'express';
import userController from "./userController";

const router = Router();

router.get('/', userController.getAllUsers)

router.post('/', userController.createUser)

router.put('/', userController.updateUser)

export default router