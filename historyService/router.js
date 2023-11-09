import {Router} from 'express'
import historyController from "./historyController.js";

const router = Router();

router.get('/', historyController.getHistory)

router.get('/:page', historyController.getHistoryByPage)

router.post('/',historyController.createLog)

export default router