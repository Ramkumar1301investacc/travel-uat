import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();
const auserId = process.env.USER_ID;
const apassword = process.env.A_PASSWORD;
const aIntemdCode = process.env.A_Intemd_Code;
const getAllPlansUrl = process.env.GET_ALL_PLANS;

(async () => {
  const fetch = await import('node-fetch').then(m => m.default);

  const body = {
    "auserId": auserId,
    "apassword": apassword,
    "aIntemdCode": aIntemdCode,
    "pDealerCode": "0",
    "pIntermediaryList_out": [
      {
        "pAgentCode": ""
      }
    ],
    "pTravelList_out": [
      {
        "countPplan": "",
        "pplan": ""
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

  const response = await fetch(getAllPlansUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'gilitraveluat',
    password: 'root',

    port: 5432,
  });
  await client.connect();
  const data = await response.json();
  // console.log('After response json', data);

  const dataArray = Object.values(data).slice(3, 4);
  // console.log("parsed array", dataArray)

  const parsedData = (dataArray[0]);

  // console.log('Parsed Data', parsedData);
  for (const item of parsedData) {
    const query = ` INSERT INTO bajaj.tblbajajtravelplanlist(
      countpplan, pplan)
          VALUES ($1,$2);

        `;
    const values = [
      item.countPplan,
      item.pplan

    ];
    try {
      await client.query(query, values);
      console.log('Data inserted successfully!');

      console.log(values);
    } catch (err) {
      console.error(err);
    }
  }


  console.log("Project is running");

  // Close connection
  await client.end();
  console.log("Project ended");
})();
