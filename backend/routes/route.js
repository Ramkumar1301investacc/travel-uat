import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { CalculatePremium, getStudentTravelPlan } from '../controller/bajaj/controller.js';
const router = express.Router();
dotenv.config();

const auserId = process.env.USER_ID;
const apassword = process.env.A_PASSWORD;
const aIntemdCode = process.env.A_Intemd_Code;
const getAllPlansUrl = process.env.GET_ALL_PLANS;
const calculatepremium = process.env.CALCULATE_PREMIUM;
router.use(bodyParser.json());
router.use(express.json())
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

router.post('/api/v1/CalculatePremium', async (req, res) => {
    try {
        //const plans=['']
        const pfromdate=req.body.travelpremiumin.pfromdate;
        const  ptravelplan  = req.body.travelpremiumin.ptravelplan;
        console.log(ptravelplan,pfromdate)
        // console.log(req.body)
        const data = await CalculatePremium(ptravelplan,pfromdate);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


export default router;