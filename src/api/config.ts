function getApiKey() {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_WEATHER_API_KEY) {
    return import.meta.env.VITE_WEATHER_API_KEY;
  }
  return process.env.VITE_WEATHER_API_KEY;
}

export const API_CONFIG = {
    BASE_URL: 'https://api.openweathermap.org/data/2.5',
    GEO: 'https://api.openweathermap.org/geo/1.0',
    API_URL: getApiKey(),
    DEFAULT_PARAMS: {
        units: 'metric',
        limit: 1,
        appid: getApiKey(),
    }
}