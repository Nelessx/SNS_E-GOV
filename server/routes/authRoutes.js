import express from 'express';
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';
import { 
  register, 
  login, 
  getAllUsers, 
  getPendingUsers, 
  approveUser, 
  rejectUser 
} from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Admin routes - protected with both authentication and admin check
router.get('/users', 
  authenticate, 
  isAdmin, 
  getAllUsers
);

router.get('/pending-users', 
  authenticate, 
  isAdmin, 
  getPendingUsers
);

router.put('/approve-user/:userId', 
  authenticate, 
  isAdmin, 
  approveUser
);

router.put('/reject-user/:userId', 
  authenticate, 
  isAdmin, 
  rejectUser
);

export default router; 