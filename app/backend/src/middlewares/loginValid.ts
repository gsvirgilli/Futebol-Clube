import { NextFunction, Request, Response } from 'express';
import { emailSchema, passwordSchema } from './schemas/loginSchema';

export default function loginValidation(req: Request, res: Response, next: NextFunction) {
  const { email: userEmail, password: userPassword } = req.body;
  if (!userEmail || !userPassword) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const { error: emailValidationError } = emailSchema.validate(userEmail);
  const { error: passwordValidationError } = passwordSchema.validate(userPassword);
  if (emailValidationError || passwordValidationError) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
}
