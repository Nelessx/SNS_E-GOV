import express from 'express';
import { 
  submitForm, 
  getAllForms, 
  getUserForms, 
  approveForm, 
  rejectForm 
} from '../controllers/formController.js';
import { isAdmin, isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Submit a new form (authenticated users only)
router.post('/submit', isAuthenticated, submitForm);

// Get all forms (admin only)
router.get('/all', isAuthenticated, isAdmin, getAllForms);

// Get user's own forms (authenticated users only)
router.get('/my-forms', isAuthenticated, getUserForms);

// Approve form (admin only)
router.put('/approve/:applicationId', isAuthenticated, isAdmin, approveForm);

// Reject form (admin only)
router.put('/reject/:applicationId', isAuthenticated, isAdmin, rejectForm);

export default router; 