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
        const pfromdate = new Date(req.body.tripStart);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const day = pfromdate.getDate().toString().padStart(2, '0');
        const month = months[pfromdate.getMonth()];
        const year = pfromdate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        console.log(formattedDate);

        const ptravelplan = 'Travel Ace Standard';
        const ptodate = req.body.tripEnd;
        const pdateofbirth = req.body.ageofTravellerOne;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});


export default router;