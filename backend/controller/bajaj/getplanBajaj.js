import client from 'pg'
(async()=>{
    const fetch =await import('node-fetch').then(m=> m.default);

    const body ={
        "auserId": "webservice@investacc.com",
        "apassword": "Bagic123",
        "aIntemdCode": "0",
        "pDealerCode": "0",
        "pIntermediaryList_out": [
          {
            "pAgentCode": ""
          }
        ],
        "pTravelList_out": [
          {
            "countPplan": "2",
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

    const response = await fetch('http://htapi.bagicpp.bajajallianz.com/BjazTravelWebServices/travelplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const client = new client({
        user: 'postgres',
        host: 'localhost',
        database: 'EnrollmentDataDetail',
        password: 'root',
    
        port: 5432,
      });
      await client.connect();
      const data = await response.json();
    //   console.log(data);
    
      const dataArray = Object.values(data).slice(3,4);
      console.log("parsed array",dataArray)

      const parsedData = (dataArray[0]);
      
     console.log(parsedData);
     for (const item of parsedData){
        const query=` INSERT INTO public.bajajdetail(
             countpplan, pplan)
            VALUES ($1, ,$2);

        )  `
         const values=[
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
