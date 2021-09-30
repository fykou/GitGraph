function getOptionalEnvVar(varKey: string): string | undefined {
  return process.env[varKey]
}

export function getEnvVar(envVar: string): string {
  const optionalEnvVar = getOptionalEnvVar(envVar)

  if (!optionalEnvVar || typeof optionalEnvVar !== 'string') {
    throw new Error(`Environment variable ${envVar} is required`)
  }

  return optionalEnvVar
}
