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
const responseidUrl = process.env.REQUEST_ID;
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
            "pareaplan": "Worldwide Including USA and Canada",
            "pdiscount": "421202"
         }
      };

      let headers = {
         "Content-Type": "application/json"
      };

      const response = await fetch(calculatepremium, { method: 'POST', headers: headers, body: JSON.stringify(payload) });
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
      const response = await fetch(getPlanDetailsUrl, { method: 'POST', headers: headers, body: JSON.stringify(payload) });
      if (!response.ok) {
         throw new Error(`HTTP error! Error: ${response.error}`)
      }
      const data = await response.json();
      return data;

   } catch (error) {
      console.error('Error while getting plan details', error)
   }
}

// Request Endpoint vala hai 
export const requestId = async (data) => {
   try {
      let payload = {

         "userid": auserId,
         "password": apassword,
         "travelPartnerDtls": {
            "sex": "M",
            "userid": auserId,
            "state": "CHANDIGARH",
            "lastname": "Ashish",
            "partnertype": "P",
            "city": "CHANDIGARH",
            "empstatus": "unemployed",
            "partnerid": "0",
            "title": "Mr",
            "maritalstatus": "SINGLE",
            "extCol9": "BN3061248183918",
            "extCol8": "HYPER,DIAB,HYPERLI",
            "extCol7": "YES",
            "extCol6": "",
            "extCol5": "",
            "institutionname": "",
            "extCol4": "",
            "extCol3": "",
            "extCol2": "",
            "extCol1": "",
            "streetname": "Airport Road",
            "occupation": "student",
            "building": "GE Plaza",
            "middlename": "B",
            "fax": "",
            "locationcode": "",
            "regno": "",
            "passportno": "Z5166208",
            "assigneename": "Ashish",
            "firstname": "Ashish",
            "companyname": "",
            "extCol10": "",
            "country": "India",
            "pincode": "160014",
            "nationality": "Indian",
            "email": "asdfg@jhk.com",
            "dob": "15-MAY-2000",
            "requestid": "",
            "telephone": "0202665656",
            "mobileno": "9860221144"
         },
         "pTrvPolDtls": {
            "paymentMode": "CC",                          //Payment mode
            "extraCol4": "",
            "extraCol5": "",
            "extraCol2": "",
            "areaplan": "Worldwide Including USA and Canada",
            "extraCol3": "",
            "extraCol1": "",
            "userid": "webservice@investacc.com",
            "travelplan": "Student Companion Standard",
            "returnpath": "http://localhost:59639/Travel_IAMI/Travel/TransactionStatus",                 // call back url
            "policyNo": "",
            "masterpolicyno": "",
            "familyFlag": "N",
            "productCode": "9910",
            "loading": "",
            "toDate": "25-Mar-2024",
            "assigneeName": "SURESH JAIN",
            "systemip": "",
            "destination": "USA",
            "discount": "0",
            "fromDate": "22-Mar-2024",
            "dob": "18-Mar-2000",
            "spCondition": "",
            "requestid": "",
            "finalPremium": ""
         },
         "familyparamlist": [
            {
               "pvname": "Ashish Ashish",
               "pvage": "37",
               "pvrelation": "SELF",
               "pvsex": "M",
               "pvpartnerid": "",
               "pvdob": "18-Mar-2000",
               "pvpassportno": "Z5166208",
               "pvassignee": "Male"
            }
         ],
         "pRequestid_out": "",
         "pError_out": {
            "errNumber": "",
            "parName": "",
            "property": "",
            "errText": "",
            "parIndex": "",
            "errLevel": ""
         },
         "pErrorCode_out": 0



      };
      let headers = {
         "Content-Type": "application/json"
      };
      const response = await fetch(responseidUrl, { method: 'POST', headers: headers, body: JSON.stringify(payload) });
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

//-------------------><-----------------------------

// For Calculate premium: Assuming ptravelplan is a valid travel plan
/*  const travelPlan = ['Travel Ace Standard', 'Travel Ace Silver', 'Travel Ace Gold'];
 
 if (!travelPlan.includes(ptravelplan)) {
    throw new Error('Invalid travel plan');
 }
*/