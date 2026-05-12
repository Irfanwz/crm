import express from 'express';
import { 
  getAll, 
  getById, 
  create, 
  recordInquiry, 
  respondToInquiry, 
  setFollowUp, 
  deleteOne 
} from '../controllers/inquiryController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/', create);

// Protected routes
router.use(authMiddleware);

router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id/record', recordInquiry);
router.put('/:id/respond', respondToInquiry);
router.put('/:id/followup', setFollowUp);
router.delete('/:id', deleteOne);

export default router;
