

//version 2
import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
dotenv.config();

(async () => {
    const fetch = await import('node-fetch').then(m => m.default);

    // Connect to the database to fetch plan names
    const clientDB = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'EnrollmentDataDetail',
        password: 'root',
        port: 5432,
    });

    try {
        await clientDB.connect();

        // Query to fetch plan names
        const dbQuery = 'SELECT pplan FROM public.bajajdetail;';
        const dbResult = await clientDB.query(dbQuery);
        const planNames = dbResult.rows.map(row => row.pplan);

        // Disconnect from the database
        await clientDB.end();

        for (const planName of planNames) {
            // Connect to PostgreSQL database
            const client = new Client({
                user: 'postgres',
                host: 'localhost',
                database: 'EnrollmentDataDetail',
                password: 'root',
                port: 5432,
            });

            await client.connect();

            try {
                // Construct the body for the API request
                const body = {
                    "pUserId": process.env.USER_ID,
                    "apassword": process.env.A_PASSWORD,
                    "aPlanname": planName,
                    "pTrvPlanDtlsList_out": [
                        {
                            "maxAgeTo": "",
                            "planname": planName,
                            "areaname": "", // Or fetch from DB if needed
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
                            "extCol1": "",
                        }
                    ],
                    "pTrvCoverDtlsList_out": [
                        {
                            "pbenefits": planName, // Assuming plan name is used as the benefit for coverage
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

                // Make API request for the current plan
                const response = await fetch(process.env.PLAN_DETAILS, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                // Parse API response
                const responseData = await response.json();
const planDetails = responseData.pTrvPlanDtlsList_out; // Store plan details for this plan
const coverageDetails = responseData.pTrvCoverDtlsList_out; // Store coverage details for this plan

// Iterate over each plan detail
for (const plan of planDetails) {
    const { maxAgeTo, areaname, minAgeFrom } = plan;
    console.log("Inserting plan:", planName);
    
    // Insert the current plan into the TravelPlan table
    const insertPlanResult = await client.query('INSERT INTO TravelPlan (PlanName, CoverageArea, MinAgeFrom, MaxAgeTo) VALUES ($1, $2, $3, $4) RETURNING PlanID',
        [planName, areaname, minAgeFrom, maxAgeTo]);
    const planID = insertPlanResult.rows[0].PlanID; // Get the inserted plan ID

    // Iterate over each coverage detail
    for (const coverage of coverageDetails) {
        const { pbenefits, pdeductible, plimits } = coverage;
        console.log("Inserting coverage:", pbenefits);
        
        // Insert the current coverage detail into the CoverageDetail table along with the corresponding plan ID
        await client.query('INSERT INTO CoverageDetail (PlanID, pbenefits, pdeductible, plimits) VALUES ($1, $2, $3, $4)',
            [planID, pbenefits, pdeductible, plimits]);
    }

    console.log("Data inserted successfully for plan:", planName);
}

            } catch (error) {
                console.error('Error:', error);
            } finally {
                // Close the connection
                await client.end();
            }
        }

    } catch (error) {
        console.error('Error:', error);
    }
})();
