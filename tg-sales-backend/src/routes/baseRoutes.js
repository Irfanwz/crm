import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';

const createRouter = (controller) => {
  const router = express.Router();

  router.get('/', authMiddleware, controller.getAll);
  router.get('/:id', authMiddleware, controller.getById);
  router.post('/', authMiddleware, controller.create);
  router.put('/:id', authMiddleware, controller.update);
  router.delete('/:id', authMiddleware, controller.remove);

  return router;
};

export default createRouter;
