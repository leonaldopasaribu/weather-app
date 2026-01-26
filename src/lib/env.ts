/**
 * Environment variable validation
 * Ensures all required environment variables are present at runtime
 */

interface EnvVars {
  NEXT_PUBLIC_OPENWEATHER_API_KEY: string;
  NEXT_PUBLIC_OPENWEATHER_API_URL: string;
}

function validateEnv(): EnvVars {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const apiUrl = process.env.NEXT_PUBLIC_OPENWEATHER_API_URL;

  if (!apiKey || apiKey === 'your_api_key_here') {
    throw new Error(
      'Missing NEXT_PUBLIC_OPENWEATHER_API_KEY environment variable. Please add it to your .env.local file.'
    );
  }

  if (!apiUrl) {
    throw new Error(
      'Missing NEXT_PUBLIC_OPENWEATHER_API_URL environment variable. Please add it to your .env.local file.'
    );
  }

  return {
    NEXT_PUBLIC_OPENWEATHER_API_KEY: apiKey,
    NEXT_PUBLIC_OPENWEATHER_API_URL: apiUrl,
  };
}

export const env = validateEnv();
