import { User } from '../db/mongoose';

export const checkRole = (requiredRole) => async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming you have a middleware to attach the user to the request
        const user = await User.findById(userId);

        if (!user || user.role !== requiredRole) {
            throw new Error('Unauthorized');
        }

        next();
    } catch (error) {
        console.error('Role check error:', error);
        res.status(403).json({ error: 'Unauthorized' });
    }
};