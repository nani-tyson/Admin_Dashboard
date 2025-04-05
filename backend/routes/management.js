import express from 'express';
import { get } from 'mongoose';
import { getAdmin, getUserPerformance } from '../controllers/management.js';

const router = express.Router();

router.get('/admin', getAdmin).get('/performance/:id',getUserPerformance)
export default router;