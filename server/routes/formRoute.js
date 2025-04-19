import express from 'express';
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';
import { 
  submitForm, 
  getAllForms, 
  getUserForms, 
  approveForm, 
  rejectForm 
} from '../controllers/formController.js';

const router = express.Router();

// User routes
router.post('/submit', authenticate, submitForm);
router.get('/my-forms', authenticate, getUserForms);

// Admin routes
router.get('/all', authenticate, isAdmin, getAllForms);
router.put('/approve/:applicationId', authenticate, isAdmin, approveForm);
router.put('/reject/:applicationId', authenticate, isAdmin, rejectForm);

export default router;