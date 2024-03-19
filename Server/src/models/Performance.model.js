import mongoose from 'mongoose';
import { string } from 'zod';

const performanceSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    },
    score: {
        type: Number,
        default: 0,
    },

    // loggedIn:{
    //     type: String,
    //     default: false
    // },
    answers: [
        {
            question: {
                type: String,
                required: true,
            },
            answer: {
                type: String,
                required: true,
            },
            isCorrect: {
                type: Boolean,
                default: false,
            },
            crypticStarted:{
                type: Boolean,
                default:false
            },
            submitTime:{
                type: Date,
            },
            timeTaken:{
                type:Number,
            }
        },
    ],
});

const Performance = mongoose.model('Performance', performanceSchema);

export default Performance;
