import express from 'express';
import { getStudentTravelPlan } from '../controller/controller.js';

const router = express.Router();

router.get('/getStudentsTravelPlan', async(req, res) => {
    try {
        const data = await getStudentTravelPlan();
        res.json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({message : error.message})
    }
})

export default router;