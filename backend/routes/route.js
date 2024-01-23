import express from 'express';
import { getStudentTravelPlan } from '../controller/bajaj/controller.js';
const router = express.Router();

router.get('api/v1/getStudentsTravelPlan', async(req, res) => {
    try {
        const data = await getStudentTravelPlan();
        res.json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({message : error.message})
    }
})

router.post('api/v1/travelPlan_Bajaj',async(req,res)=>{
    
})
export default router;