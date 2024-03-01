import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();
const auserId = process.env.USER_ID;
const apassword = process.env.A_PASSWORD;
const aIntemdCode = process.env.A_Intemd_Code;
const planDetails = process.env.PLAN_DETAILS;

(async () => {
    const fetch = await import('node-fetch').then(m => m.default);

    const body = {
        "pUserId": auserId,
        "apassword": apassword,
        "aPlanname": "Travel Ace Standard",
        "pTrvPlanDtlsList_out": [
            {
                "maxAgeTo": "",
                "planname": "",
                "areaname": "mumbai",
                "minAgeFrom": "",
                "minDaysFrom": "",
                "extCol10": "",
                "maxDaysTo": "",
                "extCol9": "",
                "extCol8": "",
                "extCol7": "",
                "extCol6": "",
                "extCol5": "",
                "extCol4": "",
                "extCol3": "",
                "extCol2": "",
                "extCol1": ""
            }
        ],
        "pTrvCoverDtlsList_out": [
            {
                "pbenefits": "",
                "pdeductible": "",
                "plimits": ""
            }
        ],
        "pError_out": {
            "errNumber": "",
            "parName": "",
            "property": "",
            "errText": "",
            "parIndex": "",
            "errLevel": ""
        },
        "pErrorCode_out": "0"
    };
    const response = await fetch(planDetails, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'EnrollmentDataDetail',
        password: 'root',

        port: 5432,
    });
     await client.connect();
    const data = await response.json();
    //console.log(data);
   /*  const dataArray = Object.values(data).slice(1);
   console.log("parsed array",dataArray) */

    //const parsedData = (dataArray[0]);
    
   //console.log(parsedData);
    // await client.end();

    console.log("Project ended");
})();

