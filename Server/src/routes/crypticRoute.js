import express from 'express';
import bodyParser from "body-parser";
import { authenticateToken } from '../middleware/authMiddleware.js';
import path from "path";
import { User } from '../models/user.model.js';
import { Team } from '../models/team.model.js';
import Performance from '../models/Performance.model.js';


const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(express.json()); // Enable JSON request body parsing


class QuestionNode {
    constructor(question, correctAnswer, hint) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.hint = hint;
        this.next = null;
    }
};


// Create a linked list of questions
const question1 = new QuestionNode("What is 2 + 2?", "4", "WTF Bro, Addition is the Answer!");
const question2 = new QuestionNode("What is the capital of France?", "Paris", "OMG, City of Love");
const question3 = new QuestionNode("What is the square root of 16?", "4", "Piii Kaaaa Chhhuuuuuuu");
const question4 = new QuestionNode("What is the largest ocean in the world?", "Pacific Ocean", "Us bro Us");
const question5 = new QuestionNode("What is the chemical formula for water?", "H2O", "Jal Lijiye Thak Gye Hoge");
const question6 = new QuestionNode("What is the capital of Japan?", "Tokyo", "Drift baby");
const question7 = new QuestionNode("What is the name of the largest mountain in the world?", "Mount Everest", "Fateh Kr");
const question8 = new QuestionNode("What is the chemical symbol for gold?", "Au", "Jese Kutte Rote h");
const question9 = new QuestionNode("What is the name of the largest river in the world?", "Amazon River", "Apni Dukaan");
const question10 = new QuestionNode("What is the capital of China?", "Beijing", "Sorry Bro, Archisha ne Answer hi nhi bataya!!");

question1.next = question2;
question2.next = question3;
question3.next = question4;
question4.next = question5;
question5.next = question6;
question6.next = question7;
question7.next = question8;
question8.next = question9;
question9.next = question10;

const questionArr = [question1,question2,question3,question4,question5,question6,question7,question8,question9,question10]

// let currentQuestion = question1; // Track the current question
const questionQue = [];
var questionIsLocked = false;

router.get('/question',authenticateToken, async(req, res) => {
    const req_user = req.user;
    if (questionIsLocked) {
        questionQue.push(req_user);
        console.log("request qued:",req.user._id);
    }
    else{
        questionIsLocked = true;
        console.log("request:",req_user._id);

        const result = await question(req_user);
        res.json(result);
    }

    while (que.length > 0) {
        const next_data = questionQue.shift();
        const result_qued = await question(next_data);
        res.json(result_qued);
    }

    questionIsLocked = false;

    
  });

  async function question(req_user){
    // Return the current question
    const team = await Team.findOne({name:req_user.team});
    const teamPerformance =  await Performance.findOne({team:team._id});

    // Time at which a team fetches a question for the first time
    const time = new Date();

    const answersLen = teamPerformance.answers.length;

    // Check if Cryptic has started for that team
    if(teamPerformance.answers[answersLen-1].crypticStarted === false){
        const updatedAnswer = await Performance.updateOne({_id:teamPerformance._id},{
            $push:{
            answers: {
                question: questionArr[0].question,
                answer: "Not answered yet",
                isCorrect: false,
                crypticStarted:true,
                submitTime:time,
                timeTaken:time
            }
        }});
    }
    const score = teamPerformance.score;
    return{
      question: questionArr[score].question,
    };
  }
  

// refresh based on whether a memeber of that team has answered the right answer

const que = [];
let isLocked = false;

router.post('/answer',authenticateToken, async(req, res) => {
    if (isLocked) {
        que.push({
            req_user:req.user,
            req_body:req.body
        });
        console.log("request qued:",req.user._id);
    }
    else{
        isLocked = true;
        console.log("request:",req.user._id);

        const result = await checkAndResolve({
            req_user:req.user,
            req_body:req.body
        });
        res.json(result);
    }

    while (que.length > 0) {
        const next_data = que.shift();
        const result_qued = await checkAndResolve(next_data);
        res.json(result_qued);
    }

    isLocked = false;
});



router.post('/reset',authenticateToken ,(req, res) => {
async function run2(){
    try{
    // Add a new field reset in Performance Schema whose value would be set to default True
    const resetAll = await Performance.updateMany(
        { reset: true },
        { $set: { 'products.$[].question': 'reset', 'products.$[].answer': 'reset', 'products.$[].isCorrect': false } });
    }catch(err){
    console.log(err);
    }
};run2()
res.json({ message: 'Game reset. Start from the beginning.' });
});


// Check answer strategy function ----------------------------------------------------------------------------------------------->
async function checkAndResolve(data){
const userAnswer = data.req_body.answer.trim(); // Get the user's answer from the request body
// User that answered
const userAnswered = await User.findOne({username:data.req_user._id});
// Team that answered
const teamAnswered = await Team.findOne({name:userAnswered.team});
// Performance of the team that answered
const performance = await Performance.findOne({team:teamAnswered._id});
// Current question
const currentQuestion = questionArr[performance.score];
// Correct answer of that question
const correctAnswer = currentQuestion.correctAnswer;



// Check if the user's answer is correct
if (userAnswer === correctAnswer || userAnswer.toLowerCase() === correctAnswer.toLowerCase() || userAnswer.toUpperCase === correctAnswer.toUpperCase()) {

    // Updating teams Score in Performance collection
    try{

        // Setting new Score of that team
        const newScore = performance.score+1;

        // Time at which answered
        const time = new Date();

        // Time at which previous answer is submitted
        const arrLength = performance.answers.length;
        const timePrevData = performance.answers[arrLength-1].submitTime;

        // Time taken
        const timeTaken = time-timePrevData;

        const seconds = Math.floor(timeTaken / 1000);
        const minutes = Math.floor(seconds / 60);


        // Updating New Score in database
        const updatedScore = await Performance.updateOne({_id:performance._id},{score: newScore});
        const updatedAnswer = await Performance.updateOne({_id:performance._id , score: newScore},{
        $push:{
        answers: {
            question: currentQuestion.question,
            answer: userAnswer,
            isCorrect: true,
            crypticStarted:true,
            submitTime:time,
            timeTaken:minutes
        }
        }});
        // Advance to the next question
        if (currentQuestion.next) {
            // currentQuestion = currentQuestion.next;
            // res.json({ message: 'Correct! Next question:' });
            return { message: 'Correct! Next question:' };

            } else {
            return { message: 'You\'ve completed the game!' };
        };

    }catch(err){ 
        return { message: 'Incorrect Answer' };
    }
    
    
} else {
    // res.json({ message: 'Incorrect answer. Try again.' });
    return{
    message: currentQuestion.hint
    }
}
}





export default router;