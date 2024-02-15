import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { CalculatePremium, getCorporatePlans, getStudentTravelPlan } from '../controller/bajaj/controller.js';
const router = express.Router();
dotenv.config();

router.use(bodyParser.json());
router.use(express.json());

const ptravelplan = [];

router.get('/api/v1/getStudentsTravelPlan', async (req, res) => {
    try {
        const data = await getStudentTravelPlan();
        res.json(data);
        // ptravelplan = data;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
})

router.get('/api/v1/corporatePlan', async (req, res) => {
    try {
        const data = await getCorporatePlans();
        res.json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
})

router.post('api/v1/travelPlan_Bajaj', async (req, res) => {

})

router.post('/api/v1/CalculatePremium', async (req, res) => {
    try {
        // console.log(req.body)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const pfromdate = new Date(req.body.data.tripStart);
        const fromDay = pfromdate.getDate().toString().padStart(2, '0');
        const fromMonth = months[pfromdate.getMonth()];
        const fromYear = pfromdate.getFullYear();
        const formattedFromDate = `${fromDay}-${fromMonth}-${fromYear}`;
      

        const ptodate = new Date(req.body.data.tripEnd);
        const toDay = ptodate.getDate().toString().padStart(2, '0');
        const toMonth = months[ptodate.getMonth()];
        const toYear = ptodate.getFullYear();
        const formattedToDate = `${toDay}-${toMonth}-${toYear}`;
       

        const ptravelplan = ['Travel Prime Individual Silver 50000 USD', 'Travel Prime Individual Super Platinum 7.5 lakhs USD', 'Travel Prime Individual Gold 2 lakhs USD']
        

        const plans = await req.body.plans.map((plan) => plan.pplan);
        console.log(plans)
        

        const pdateofbirth = new Date(req.body.data.ageofTravellerOne);
        const birthDay = pdateofbirth.getDate().toString().padStart(2, '0');
        const birthMonth = months[pdateofbirth.getMonth()];
        const birthYear = pdateofbirth.getFullYear();
        const formattedBirthDate = `${birthDay}-${birthMonth}-${birthYear}`;
       

        const results = []
        for(let plan of plans)
        {
            const data = await CalculatePremium(formattedToDate, plan, formattedBirthDate, formattedFromDate)
            console.log(data)
            results.push(data)
        }
        res.json(results)
        // const data = await CalculatePremium(formattedToDate, ptravelplan, formattedBirthDate, formattedFromDate);
        //     res.json(data)
        




    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


export default router;