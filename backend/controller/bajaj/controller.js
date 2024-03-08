import dotenv from 'dotenv';
import axios from 'axios';
import fetch from 'node-fetch';



dotenv.config();

const auserId = process.env.USER_ID;
const apassword = process.env.A_PASSWORD;
const aIntemdCode = process.env.A_Intemd_Code;
const getAllPlansUrl = process.env.GET_ALL_PLANS;
const calculatepremium = process.env.CALCULATE_PREMIUM;
const getPlanDetailsUrl = process.env.GETPLANDETAILS;

export const getStudentTravelPlan = async () => {
   try {
      let payload =
      {
         "auserId": auserId,
         "apassword": apassword,
         "aIntemdCode": aIntemdCode,
         "pDealerCode": "0",
      }

      let headers = {
         "Content-Type": "application/json"
      }

      const response = await axios.post(getAllPlansUrl, payload, { headers: headers });
      const allPlans = response.data.pTravelList_out;
      const studentsPlan = allPlans.filter((plan) => plan.pplan.includes('Student'));

      return studentsPlan;
   } catch (error) {
      console.error('Error while executing getStudentTravelPlan', error);
   }
}

export const getCorporatePlans = async () => {
   try {
      let payload =
      {
         "auserId": auserId,
         "apassword": apassword,
         "aIntemdCode": aIntemdCode,
         "pDealerCode": "0",
      }

      let headers = {
         "Content-Type": "application/json"
      }

      const response = await axios.post(getAllPlansUrl, payload, { headers: headers });
      const allPlans = response.data.pTravelList_out;
      const corporatePlan = allPlans.filter((plan) => plan.pplan.includes('Corporate'))

      return corporatePlan;

   } catch (error) {
      console.error('Error while executing corporate plans', error)
   }
}

export const getSingleTripPlans = async () => {
   try {
      let payload =
      {
         "auserId": auserId,
         "apassword": apassword,
         "aIntemdCode": aIntemdCode,
         "pDealerCode": "0",
      }

      let headers = {
         "Content-Type": "application/json"
      }

      const response = await axios.post(getAllPlansUrl, payload, { headers: headers });
      const allPlans = response.data.pTravelList_out;
      console.log(allPlans)
      const individualPlan = allPlans.filter((plan) => plan.pplan.includes('Individual'))

      return individualPlan;


   } catch (error) {
      console.error('Error while executing get single trip plans', error)
   }
}

export const CalculatePremium = async (ptodate, ptravelplan, pdateofbirth, pfromdate) => {
   try {

      let payload = {
         "userid": auserId,
         "password": apassword,
         "familyflag": "N",
         "puwFlag_out": "",
         "travelpremiumin": {
            "pspdiscount": "",
            "ploading": "",
            "ptodate": ptodate,
            "ptravelplan": ptravelplan,
            "pdateofbirth": pdateofbirth,
            "pfromdate": pfromdate,
            "pareaplan": "Worldwide Excluding USA and Canada",
            "pdiscount": "421202"
         }
      };

      let headers = {
         "Content-Type": "application/json"
      };

      const response = await fetch(calculatepremium, { method: 'POST', headers: headers, body: JSON.stringify(payload)});
      if (!response.ok) {
         throw new Error(`HTTP error! Error: ${response.error}`);
      }
      const data = await response.json();
      return data;

   } catch (error) {
      console.error('Error while executing calculate premium', error);
      throw error; // Propagate the error to the caller
   }
};

export const getPlanDetails = async (plan) => {
   try {
      let payload = {
         "pUserId": auserId,
         "apassword": apassword,
         "aPlanname": plan
      };
      let headers = {
         "Content-Type": "application/json"
      };
      const response = await fetch(getPlanDetailsUrl, { method: 'POST', headers: headers, body: JSON.stringify(payload)});
      if(!response.ok) {
         throw new Error(`HTTP error! Error: ${response.error}`)
      }
      const data = await response.json();
      return data;

   } catch (error) {
      console.error('Error while getting plan details', error)
   }
}




// For Calculate premium: Assuming ptravelplan is a valid travel plan
/*  const travelPlan = ['Travel Ace Standard', 'Travel Ace Silver', 'Travel Ace Gold'];
 
 if (!travelPlan.includes(ptravelplan)) {
    throw new Error('Invalid travel plan');
 }
*/