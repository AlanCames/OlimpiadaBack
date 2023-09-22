import * as Joi from 'joi';

export const JoiEnvValidations = Joi.object({
  PORT: Joi.number().default(8000),
  JWT_SECRET: Joi.string().default('abcdefg'),
});
