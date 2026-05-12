import express from 'express';
import { 
  getAll, 
  getBySalesPerson, 
  getById, 
  create, 
  update, 
  deleteOne 
} from '../controllers/commissionController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes protected with authMiddleware
router.use(authMiddleware);

router.get('/', getAll);
router.get('/salesperson/:salesperson_id', getBySalesPerson);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteOne);

export default router;
