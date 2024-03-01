import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'giliTravelUat',
    password: 'root',
    port: 5432
})

export const addUserDetails = (request, response) => {
    try {
        const { tDest, tripStart, tripEnd, numOfTraveller, ageofTravellerOne,  ageofTravellerTwo, mobileNumber} = request.body;
        console.log(tripEnd);

        pool.query("INSERT INTO public.gilitraveldetails (traveldestination, startdate, enddate, nooftraveller, dateofbirth, age, mobilenumber) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", 
        [tDest,  tripStart, tripEnd, numOfTraveller, ageofTravellerOne, 24, mobileNumber ], (error, results) => {
            if(error)
            {
                throw error;
            }
            response.status(201).json('User added');
            console.log('User added')
        } )

    } catch (error) {
        console.error('Cannot get request', error)
    }
}