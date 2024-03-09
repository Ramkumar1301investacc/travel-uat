import { error } from 'console';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'gilitraveluat',
    password: 'root',
    port: 5432
})

export const addUserDetails = (request, response) => {
    try {
        const { tDest, tripStart, tripEnd, numOfTraveller, ageofTravellerOne, ageofTravellerTwo, mobileNumber } = request.body;

        pool.query("INSERT INTO public.tblgilitraveldetail (traveldestination, startdate, enddate, nooftraveller, dateofbirth, age, mobilenumber) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [tDest, tripStart, tripEnd, numOfTraveller, ageofTravellerOne, 24, mobileNumber], (error, results) => {
                if (error) {
                    throw error;
                }
                response.status(201).json('User added');
                console.log('User added')
            })

    } catch (error) {
        console.error('Cannot get request', error)
    }
}

export const getPlanDetailsFromDB = () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM bajaj.tblbajajplanandbenefits INNER JOIN bajaj.tblbajajcoverageareandage ON tblbajajplanandbenefits.planid = tblbajajcoverageareandage.planid;", (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                // console.log(results);
                resolve(results);
            }
        })
    })
}
//bajaj country master
export const bajajCountryMaster =()=>{
    return new Promise((resolve,reject)=>{
        pool.query('SELECT * FROM bajaj."tblBajajCountryMaster"',(error,results)=>{
            if (error) {
                reject(error);
            }
            else {
                 console.log(results);
                resolve(results);
            }
        })
    })
}
export const getSinglePlanDetails = (planName) => {
    console.log('in db.js plan name is ', planName)
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM bajaj.tblbajajplanandbenefits INNER JOIN bajaj.tblbajajcoverageareandage ON tblbajajplanandbenefits.planid = tblbajajcoverageareandage.planid WHERE planname = '${planName}'`, (error, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results)
            }
        })
    })
}