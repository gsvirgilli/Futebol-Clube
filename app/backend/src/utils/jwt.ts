import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type Payload = {
  id: number;
  username: string;
};

const signToken = (payload: Payload): string => {
  const token = jwt.sign(payload, secret);
  return token;
};

const verifyToken = (token: string): Payload => {
  const data = jwt.verify(token, secret) as Payload;
  return data;
};

export default {
  signToken,
  verifyToken,
};
