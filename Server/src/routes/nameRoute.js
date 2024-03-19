import express from "express";
import { authenticateToken } from '../middleware/authMiddleware.js';
import bodyParser from "body-parser";

const app = express();
const router = express.Router();
app.use(bodyParser.json());

router.get("/username",authenticateToken,(req,res)=>{
    res.json({username:req.user._id});
});

export default router;
