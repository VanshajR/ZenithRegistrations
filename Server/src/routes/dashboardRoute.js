import express from 'express';
import bodyParser from "body-parser";
import { authenticateToken } from '../middleware/authMiddleware.js';
import dotenv from "dotenv";
import { Team } from '../models/team.model.js';

const app = express();
const router = express.Router();
app.use(bodyParser.json());

router.post("/dashboard",authenticateToken, async(req,res)=>{
    // if(req.user.role === "admin"){
        try{
            const teamsData = await Team.find();
            const performanceData = await Performance.find();
            res.json({teamsData:teamsData,performanceData:performanceData})
        }catch(err){
            console.log(err);
        }
    // }
});

export default router;