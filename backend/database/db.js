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

export const insertProposalCustomerDetails=(request,response)=>{
    try{
        // const{firstname,middlename,surname,gender,dob,passportno,email,add1,add2,add3,state,city,pincode,isregaddsame,regadd1,regadd2,regadd3,regpin,phoneno}=request.body;
        // console.log('Owner Details', request.body?.proposalOwnerDetails);
        const {salutation,firstname,middlename,surname,gender,dob,passportno,email,add1,add2,add3,state,city,pincode,phonenumber} = request.body;
        pool.query("INSERT INTO tblproposalcustomerdetails(titleid, firstname, middlename, lastname, genderid, dob, passportno, email, add1, add2, add3, stateid, cityid,pincode, isregaddsame, regadd1, regadd2, regadd3, regpin, phoneno, altphone) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21) RETURNING *" ,
        [salutation,firstname,middlename,surname,gender,dob,passportno,email,add1,add2,add3,state,city,pincode,true,"Mumbai","Banglore","Pune",415605,phonenumber,7738761058], (error,results)=>{
            if(error){
                throw error;
            }
            response.status(201).json("Customer form filled");
            console.log("Proposal form filled");
        }) 
    }
    catch(error){
        console.log('Cannot get request',error)
    }
}

export const insertProposalNomineeDetails=(request,response)=>{
    try{
        const{nomtitleid,nomfullname,nomdob,appointeereltn,nomemail}=request.body;
        pool.query("INSERT INTO tblproposalotherdetails(nomtitleid,nomfullname,nomdob,appointeereltn,noemail) VALUES($1,$2,$3,$4,$5) RETURNING *",
        [1,nomfullname,nomdob,appointeereltn,nomemail],(error,results)=>{
            if(error){
                throw error;
            }
            response.status(201).json("Nominee form filled");
        })
    }
    catch(error){
        console.log("Cannot get request",error);
    }
}