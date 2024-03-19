// src/routes/protectedRoute.js
import express from 'express';
import { checkRole } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/protected', checkRole('team_leader'), (req, res) => {
    // Only team leaders can access this route
    res.json({ message: 'Access granted' });
});

export default router;