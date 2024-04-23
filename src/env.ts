import { z } from 'zod'

import { MissingEnvironmentVariablesError } from './app/errors/missing-environment-variables-error'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  APP_PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  throw new MissingEnvironmentVariablesError()
}

export const env = _env.data
