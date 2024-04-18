import Joi = require('joi');

const passwordSchema = Joi.string().min(6);

const emailSchema = Joi.string().email();

export { passwordSchema, emailSchema };
