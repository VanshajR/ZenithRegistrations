import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export function authenticateToken(req, res, next) {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(accessToken, process.env.SECRET_KEY , (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token expired or invalid' });
        }
        req.user = user;
        next();
    });
}
//prcess
export function generateJwtToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15h' });
}

export function generateRefreshToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
}

export function authenticateRefreshToken(req, res, next) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(refreshToken, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token expired or invalid' });
        }
        req.user = user;
        next();
    });
}
