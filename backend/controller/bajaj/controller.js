import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const auserId = process.env.USER_ID;
const apassword = process.env.A_PASSWORD;
const aIntemdCode = process.env.A_Intemd_Code;
const getAllPlansUrl = process.env.GET_ALL_PLANS;

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
      console.error(error)
   }
}