import express from 'express';
import { 
  getAll, 
  getByProject, 
  getById, 
  create, 
  update, 
  deleteOne 
} from '../controllers/costingController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes protected with authMiddleware
router.use(authMiddleware);

router.get('/', getAll);
router.get('/project/:project_id', getByProject);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', deleteOne);

export default router;
