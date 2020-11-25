const axios = require('axios');
const btoa = require( "btoa" );
const qs = require('querystring');

const apikey = "kwMHvETbrSXzaw_F3HmJG9-KmGCPa-ld_aKSgel1SBU4";
const IBM_Cloud_IAM_uid = "bx";
const IBM_Cloud_IAM_pwd = "bx";

//Get Token from apikey using base auth
const getToken = async () => {
    try{
        const data = {
            apikey: apikey,
            grant_type:'urn:ibm:params:oauth:grant-type:apikey'
        }
        const options = {
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                Authorization: "Basic " + btoa( IBM_Cloud_IAM_uid + ":" + IBM_Cloud_IAM_pwd ) 
            }
        }
        const response = await axios.post(`https://iam.cloud.ibm.com/identity/token`, qs.stringify(data), options);
        return response.data.access_token;
        //console.log(token);

    }
    catch(err){
        console.log(err)
    }
} 


//get score function by passing payload
const getScore = async (payload) => {
   try { 
       const token = await getToken();
       console.log(token)
       const options = {
            headers: {
                "Accept": "application/json",
                "content-type": "application/json;charset=UTF-8",
                Authorization: "Bearer " + token
            }
        }
        const scoring_url = "https://eu-gb.ml.cloud.ibm.com/ml/v4/deployments/fc2a8cb2-bbaf-4fb1-985a-cafb20675a18/predictions?version=2020-10-06";
        const response = await axios.post(scoring_url, payload, options);

        console.log(response.data);
        return;
    }
    catch(err){
        console.log(err)
    }
}


const submitQuestion = async () => {
    await getToken();
       const payload = {
           "input_data":[{
               "fields":["Question 1","Question 2","Question 3","Question 4","Question 5"],
               "values":[
                   ["Would you prefer to divide your work into 25-minute work sessions with 5-minute breaks ","Allocate time periods to activities; you work within this time period, and then stop once the set time runs out",null,null,null]
                ]
            }]
        }
    getScore(payload);
}


submitQuestion();