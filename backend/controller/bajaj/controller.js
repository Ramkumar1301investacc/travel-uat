import dotenv from 'dotenv';
import axios from 'axios';
import fetch from 'node-fetch';


dotenv.config();

const auserId = process.env.USER_ID;
const apassword = process.env.A_PASSWORD;
const aIntemdCode = process.env.A_Intemd_Code;
const getAllPlansUrl = process.env.GET_ALL_PLANS;
const calculatepremium = process.env.CALCULATE_PREMIUM;

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

export const CalculatePremium = async (ptravelplan, pfromdate) => {
   try {
      // Assuming ptravelplan is a valid travel plan
      /*  const travelPlan = ['Travel Ace Standard', 'Travel Ace Silver', 'Travel Ace Gold'];
 
       if (!travelPlan.includes(ptravelplan)) {
          throw new Error('Invalid travel plan');
       }
  */
      let payload = {
         "userid": auserId,
         "password": apassword,
         "familyflag": "N",
         "puwFlag_out": "",
         "travelpremiumin": {
            "pspdiscount": "",
            "ploading": "",
            "ptodate": "25-Feb-2024",
            "ptravelplan": ptravelplan,
            "pdateofbirth": "13-Jan-2001",
            "pfromdate": pfromdate,
            "pareaplan": "Worldwide Excluding USA and Canada",
            "pdiscount": "700055"
         }
      };

      let headers = {
         "Content-Type": "application/json"
      };

      const response = await fetch(calculatepremium, {
         method: 'POST',
         headers: headers,
         body: JSON.stringify(payload)
      });

      if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error('Error while executing calculate premium', error);
      throw error; // Propagate the error to the caller
   }
};


export const sendTravellerData = async(getData) => {
   const data = await getData;
   return data
}