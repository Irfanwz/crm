import express from 'express';
import { getAll, getById, create, update, deleteOne } from '../controllers/salesQuoteController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET routes are public
router.get('/', getAll);
router.get('/:id', getById);

// Protected routes (POST, PUT, DELETE)
router.post('/', authMiddleware, create);
router.put('/:id', authMiddleware, update);
router.delete('/:id', authMiddleware, deleteOne);

export default router;
