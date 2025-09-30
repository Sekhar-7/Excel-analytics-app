import express from 'express';
import File from '../models/file.js';
import User from '../models/User.js';
const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/files', async (req, res) => {
  const files = await File.find().populate('user'); // ✅ Important
  res.json(files);
});

export default router;
