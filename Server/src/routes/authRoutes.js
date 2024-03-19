import express from 'express';
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { authenticateToken, generateJwtToken, generateRefreshToken } from '../middleware/authMiddleware.js';
import { userLoginSchema,userRegistrationSchema,memberRegistrationSchema } from '../schemas/user.schema.js';
import { User } from '../models/user.model.js';
import { Team } from '../models/team.model.js';
import Performance from '../models/Performance.model.js';  
import sendMail from '../utils/email.js'; 
import { object } from 'zod';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const router = express.Router();
app.use(bodyParser.json());


const signUpQue = [];
let signUpIsLocked = false;
let currentSignUp = [];

router.post('/signup', async (req, res) => {

    res.clearCookie("G_ENABLED_IDPS");
    const userReq = req.body
    if (signUpIsLocked) {
            signUpQue.push(userReq);
    }
    else{
        signUpIsLocked = true;
        currentSignUp.push(userReq);
        const result = await signUp(userReq);
        res.json(result);
    }

    while (signUpQue.length > 0) {
        const next_data = signUpQue.shift();
        const result_qued = await signUp(next_data);
        res.json(result_qued);
    }

    signUpIsLocked = false;

    
    async function signUp(userData){
        try {
            const zodCheck = userRegistrationSchema.parse(req.body);
            const existingUser = await User.findOne({ username: userData.lName, email: userData.lMail });
            const existingTeam = await Team.findOne({ name: userData.teamName });
    
            if (Object.values(userData).includes("")) {
                return { err: "Fill all details" };
            }
    
            else if (existingUser) {
                return { err: 'Username already has an account associated with it, please login' };
            }
    
            else if (existingTeam) {
                return { err: 'Team is already there, Please Login' };
            }
            
            else{
                const hash = await bcrypt.hash(userData.lPassword, 10);

                // Time at which account is created with value crypic started as false
                const currentTime = new Date();

                // const hash = await bcrypt.hash(userData.lPassword,10);
                const newUser = await User.create({
                    username: userData.lName,
                    email: userData.lMail,
                    password: hash,
                    role: "team_leader", 
                    team: userData.teamName,
                });
        
                const newTeam = await Team.create({
                    name: userData.teamName,
                    leader: newUser
                });
        
                await Performance.create({
                    team: newTeam._id,
                    score: 0,
                    answers:[{
                        question:"first question",
                        answer:"yet to be answered",
                        isCorrect:false,
                        crypticStarted:false,
                        submitTime:currentTime,
                        timeTaken:currentTime
                    }]
                });

        
                await sendMail(userData.lName, userData.lMail,userData.teamName);
    
                return { redirect: 'login' };
    
            }
    
        }
        catch (error) {
            console.log(error);
            return { err: 'Invalid data' };
        }
    }
});

const registerQue = [];
let registerIsLocked = false;
let currentRegister = [];
router.post('/register',authenticateToken, async(req,res)=>{
    const memberData = req.body;
    if (registerIsLocked) {
            registerQue.push(memberData);
            console.log("reques qued:",memberData.username);
    }
    else{
        registerIsLocked = true;
        currentRegister.push(memberData);
        console.log("request accepted:",memberData.username);
        const result = await register(memberData);
        res.json(result);
    }

    while (registerQue.length > 0) {
        const next_data = registerQue.shift();
        const result_qued = await register(next_data);
        res.json(result_qued);
    }

    registerIsLocked = false;

    async function register(data){
        try{
            const zodCheck = memberRegistrationSchema.parse(req.body);
            const teamLeader = await User.findOne({username:req.user._id, role:"team_leader"});
            const teamData = await Team.findOne({name:req.user.team});
            const teamStrength = teamData.members.length;
            const existingMember = await User.findOne({username:data.username, email:data.email});
            const existingGmail = await User.findOne({email:data.email});

            if(teamStrength >= 3){
                return{err:"Team is full!"};
            }
    
            else if(existingMember){
                return{err:"User is already in a team"};
            }

            else if(existingGmail){
                return{err:"Email ID is already associated with an account"};
            }

            else{
                const newUser = await User.create({
                    username: data.username,
                    password: teamLeader.password,
                    email: data.email,
                    role: "team_member", 
                    team: req.user.team,
                });
        
                const updatedTeam = await Team.findOneAndUpdate(
                    { name: req.user.team },
                    { $push: { members: newUser._id } },
                    { new: true, upsert: true }
                );


                await sendMail(newUser.username,newUser.email,newUser.team);
    
                return{message:"Member Added Successfully"}
            }
    
        }catch(err){
            // console.log(err);
            return{err:"Invalid Details"};
        }
    }
    
})

const loginQue = [];
let loginIsLocked = false;
let currentLogin = [];
router.post('/login', async (req, res) => {
    res.clearCookie("G_ENABLED_IDPS");

    try {
        const zodCheck = userLoginSchema.parse(req.body);
        const userData = req.body;

        const user = await User.findOne({ username: userData.username });
        const team = await Team.findOne({ name: userData.teamName });


        
        // Empty field check
        if (Object.values(userData).includes("")) {
            return res.json({ err: "Fill all details" });
        }

        // No user or team found
        else if (!user || !team) {
            return res.json({ err: "Invalid Details" });
        }

        // Username not associated with this team
        else if (user.team.toString() !== team.name.toString()) {
            return res.json({ err: "Invalid Details" });
        }
         else if(user.role !== "team_leader"){
            return res.json({ err: "Member Login Restricted" });
         }


        else{

            bcrypt.compare(userData.password, user.password, (err, result) => {
                if (result) {
                    const accessToken = generateJwtToken({ _id: user.username, team: team.name, role: user.role });
                    const refreshToken = generateRefreshToken({ _id: user.username, team: team.name, role: user.role });
                    res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "strict" });
                    res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" });
                    // res.json({ success: true, message: 'Sign-up successful. Please log in.' });
                    if(user.role==="team_leader"){res.json({redirect:"home"})}
		    else if(user.role==="team_member"){res.json({redirect:"cryptictime"})}
    
                    // const loggedTeam = await Performance.findOneAndUpdate({ _id: performance._id },{ loggedIn: true });
                } else {
                    console.error(err);
                    res.json({ err: "Invalid Details" });
                }
            });
        }

        // Password comparison
        
    } catch (error) {
        res.json({ err: "Invalid Details" });
    }
    
});

router.post('/refresh', (req, res) => {
    const { accessToken, refreshToken } = req.body;

    jwt.verify(refreshToken, process.env.ENCRYPT_KEY || 'your_default_secret_key', (err, decoded) => {
        if (err) {
            console.log("Refresh key doesn't match");
            return res.status(401).json({ message: 'Invalid refresh token' });
        } else {
            const newAccessToken = generateJwtToken({ _id: decoded.username, role: decoded.role });

            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");

            res.cookie("accessToken", newAccessToken, { httpOnly: true, sameSite: "strict" });
            res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" });

            res.redirect("/home");
        }
    });
});

export default router;

