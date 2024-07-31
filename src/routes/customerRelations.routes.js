import { Router } from 'express';
const router = Router();
import { get, getOne } from '../controllers/customerRelations.controller.js';




router.get('/', get);

router.get('/:id', getOne);


export default router;