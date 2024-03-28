import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { CalculatePremium, getCorporatePlans, getPlanDetails, getSingleTripPlans, getStudentTravelPlan, requestId } from '../controller/bajaj/controller.js';
import { addUserDetails, getPlanDetailsFromDB, getSinglePlanDetails, bajajCountryMaster } from '../database/db.js';
import { error } from 'console';
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

router.get('/api/v2/getStudentsTravelPlan', async (req, res) => {
    try {
        const results = await getdbStudentTravelPlan();
        res.json(results.rows);
        // ptravelplan = data;
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
})
//bajaj country Master List 
router.get('/api/v1/countrymaster', async (req, res) => {
    try {
        const results = await bajajCountryMaster();
        res.json(results.row);
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

router.get('/api/v1/singleTripPlan', async (req, res) => {
    try {
        const data = await getSingleTripPlans();
        res.json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
})

router.post('api/v1/travelPlan_Bajaj', async (req, res) => {

})
//Claculate Premium
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
        const plans = await req.body.plans.map((plan) => plan.pplan);

        const pdateofbirth = new Date(req.body.data.ageofTravellerOne);
        const birthDay = pdateofbirth.getDate().toString().padStart(2, '0');
        const birthMonth = months[pdateofbirth.getMonth()];
        const birthYear = pdateofbirth.getFullYear();
        const formattedBirthDate = `${birthDay}-${birthMonth}-${birthYear}`;


        const results = []
        for (let plan of plans) {
            const data = await CalculatePremium(formattedToDate, plan, formattedBirthDate, formattedFromDate);
            // console.log(data)
            results.push(data)

        }
        res.json(results)


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
router.get('/api/v1/getdbstudentplans', async (req, res) => {

})

//Single Plan Premium
router.post('/api/v1/singlePlanPremium', async (req, res) => {
    try {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        const pfromdate = new Date(req.body.data.tripStart);
        const fromDay = pfromdate.getDate().toString().padStart(2, '0');
        const fromMonth = months[pfromdate.getMonth()];
        const fromYear = pfromdate.getFullYear();
        const formattedFromDate = `${fromDay}-${fromMonth}-${fromYear}`; //from date


        const ptodate = new Date(req.body.data.tripEnd);
        const toDay = ptodate.getDate().toString().padStart(2, '0');
        const toMonth = months[ptodate.getMonth()];
        const toYear = ptodate.getFullYear();
        const formattedToDate = `${toDay}-${toMonth}-${toYear}`; // to date
        const plan = req.body.planName; // plan name

        const pdateofbirth = new Date(req.body.data.ageofTravellerOne);
        const birthDay = pdateofbirth.getDate().toString().padStart(2, '0');
        const birthMonth = months[pdateofbirth.getMonth()];
        const birthYear = pdateofbirth.getFullYear();
        const formattedBirthDate = `${birthDay}-${birthMonth}-${birthYear}`; // birthday

        const data = await CalculatePremium(formattedToDate, plan, formattedBirthDate, formattedFromDate);
        console.log(data);
        res.json(data)


    } catch (error) {
        console.error('Error while getting sinle plan premium', error)
    }
})
//Get Plan Details Version 2
router.post('/api/v1/getPlanDetails', async (req, res) => {
    try {
        const planName = req.body.plans.map((plan) => plan.pplan);
        console.log('Plan Names ', planName)

        const results = [];
        for (let plan of planName) {
            const data = await getPlanDetails(plan);
            results.push(data)
        }
        res.json(results)
    } catch (error) {
        console.error('Unable to fetch details', error);
        res.status(500).json({ message: error.message })
    }
})

//Get Plan Details Version 2
router.get('/api/v2/getPlanDetails', async (req, res) => {
    try {
        const results = await getPlanDetailsFromDB();
        res.json(results.rows)
    } catch (error) {
        console.error('Unable to fetch plan details version 2', error);
        res.status(500).json({ message: error.message })
    }
})


//Get Single Plan Details
router.post('/api/v1/getSinglePlanDetails', async (req, res) => {
    try {
        console.log('In routes', req.body.planName)
        const result = await getSinglePlanDetails(req.body.planName);
        res.json(result.rows)
    } catch (error) {
        console.error('Unable to fetch single plan details', error)
    }
})


// request id 
router.post('/api/v1/requestId', async (req, res) => {
    try {
        console.log('Request ID output', req.body)
        const result = await requestId(req.body);
        res.json(result)
    } catch (error) {
        console.log('Unable to fetch request id from routes', error)
    }
})


export default router;