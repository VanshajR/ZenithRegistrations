// src/utils/jwtUtils.js
import jwt from 'jsonwebtoken';

export const generateJwtToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET , { expiresIn: '1h' });
};

export const verifyJwtToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
