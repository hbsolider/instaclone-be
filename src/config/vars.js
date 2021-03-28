import dotenv from 'dotenv';
dotenv.config();

export const port = process.env.PORT;
export const jwt = {
  secret: process.env.JWT_SECRET,
  accessExpirationMinutes: process.env.JWT_EXPIRATION_MINUTES,
};