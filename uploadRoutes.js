import express from 'express';
import { uploadFile } from '../controllers/UploadController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), uploadFile);

export default router;