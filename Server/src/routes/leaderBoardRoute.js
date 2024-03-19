import express from 'express';
import bodyParser from "body-parser";
import { authenticateToken } from '../middleware/authMiddleware.js';
import dotenv from "dotenv";
import { Team } from '../models/team.model.js';
import Performance from '../models/Performance.model.js';  

const app = express();
const router = express.Router();
app.use(bodyParser.json());

let finalResult = [];

router.get("/graph", async(req,res)=>{

    const result = await data();
    res.json(result);
    finalResult=[];
});

    async function data(){
        try{
            const performanceData = await Performance.find();
            for(let i=0; i<performanceData.length; i++){
                await getTeamName(performanceData[i]);
            }
            return finalResult;    
        }catch(err){
            console.log(err);
        }
    }

    


    async function getTeamName(data){
    
        const team = await Team.findOne({_id:data.team});
        const answers = data.answers;
        const newAnswer = answers.slice(2,);
        const timeTakenArr = newAnswer.map((el)=>{
            return el.timeTaken
        })
    
        const finalData = [{time:0,score:0},]
        for(let i=0;i<timeTakenArr.length;i++){
            finalData.push({time:timeTakenArr[i],score:i+1});
        }
    
        const finalObj = {
            teamName:team.name,
            data:finalData
        }    
        finalResult.push(finalObj);
    }




export default router;