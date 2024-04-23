export class MissingEnvironmentVariablesError extends Error {
  constructor() {
    super('Some environment variables are missing')
  }
}
