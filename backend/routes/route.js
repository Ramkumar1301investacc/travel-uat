import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { CalculatePremium, getStudentTravelPlan } from '../controller/bajaj/controller.js';
const router = express.Router();
dotenv.config();

router.use(bodyParser.json());
router.use(express.json());

router.get('/api/v1/getStudentsTravelPlan', async (req, res) => {
    try {
        const data = await getStudentTravelPlan();
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
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const pfromdate = new Date(req.body.tripStart);
        const fromDay = pfromdate.getDate().toString().padStart(2, '0');
        const fromMonth = months[pfromdate.getMonth()];
        const fromYear = pfromdate.getFullYear();
        const formattedFromDate = `${fromDay}-${fromMonth}-${fromYear}`;
        console.log(formattedFromDate);

        const ptodate = new Date(req.body.tripEnd);
        const toDay = ptodate.getDate().toString().padStart(2, '0');
        const toMonth = months[ptodate.getMonth()];
        const toYear = ptodate.getFullYear();
        const formattedToDate =  `${toDay}-${toMonth}-${toYear}`;
        console.log(formattedToDate);

        const ptravelplan = 'Travel Ace Standard';

        const pdateofbirth = new Date(req.body.ageofTravellerOne);
        const birthDay = pdateofbirth.getDate().toString().padStart(2, '0');
        const birthMonth = months[pdateofbirth.getMonth()];
        const birthYear = pdateofbirth.getFullYear();
        const formattedBirthDate =  `${birthDay}-${birthMonth}-${birthYear}`;
        console.log(formattedBirthDate);

        const data = await CalculatePremium(formattedToDate, ptravelplan, formattedBirthDate, formattedFromDate);
        res.json(data)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


export default router;