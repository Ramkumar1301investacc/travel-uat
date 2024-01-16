import express from 'express';
import { trial } from '../controller/controller.js';

const router = express.Router();

router.get('/trial', trial);

export default router;