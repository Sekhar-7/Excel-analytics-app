import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { summarizeData } from '../controllers/aiController.js';

const router = express.Router();

// The 'admin' middleware has been removed.
// Now, any user authenticated by 'protect' can access this route.
router.post('/summarize', protect, summarizeData);

export default router;