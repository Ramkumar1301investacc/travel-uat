//final Version
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
        database: 'gilitraveluat',
        password: 'root',
        port: 5432,
    });

    try {
        await clientDB.connect();

        // Query to fetch plan names
        const dbQuery = 'SELECT pplan FROM bajaj.tblbajajtravelplanlist;';
        const dbResult = await clientDB.query(dbQuery);
        const planNames = dbResult.rows.map(row => row.pplan);

        // Disconnect from the database
        await clientDB.end();

        // Connect to PostgreSQL database
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'gilitraveluat',
            password: 'root',
            port: 5432,
        });

        await client.connect();

        try {
            for (const planName of planNames) {
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
                const response = await fetch(process.env.GETPLANDETAILS, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });

                const responseData = await response.json();
                const planDetails = responseData.pTrvPlanDtlsList_out[0]; // Assuming there's only one plan detail in the response
                const coverageDetails = responseData.pTrvCoverDtlsList_out; // Store coverage details for this plan

                // Extract plan details from the API response
                const { maxAgeTo, areaname, minAgeFrom } = planDetails;

                // Insert plan into TravelPlan table
                const insertPlanQuery = 'INSERT INTO bajaj.tblbajajcoverageareandage (PlanName, CoverageArea, MinAgeFrom, MaxAgeTo) VALUES ($1, $2, $3, $4)';
                const insertPlanValues = [planName, areaname, minAgeFrom, maxAgeTo];
                await client.query(insertPlanQuery, insertPlanValues);

                // Fetch the inserted plan ID
                const { rows } = await client.query('SELECT LASTVAL()');
                const planID = rows[0].lastval;

                // Insert coverage details into CoverageDetail table
                for (const coverage of coverageDetails) {
                    const { pbenefits, pdeductible, plimits } = coverage;
                    console.log("Inserting coverage:", pbenefits);

                    // Insert the current coverage detail into the CoverageDetail table along with the corresponding plan ID
                    const coverageInsertQuery = 'INSERT INTO bajaj.tblbajajplanandbenefits (planid, pbenefits, pdeductible, plimits) VALUES ($1, $2, $3, $4)';
                    await client.query(coverageInsertQuery, [planID, pbenefits, pdeductible, plimits]);
                }

                console.log("Data inserted successfully for plan:", planName);


            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            // Close the connection
            await client.end();
        }

    } catch (error) {
        console.error('Error:', error);
    }
})();
