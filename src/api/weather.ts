import type { Coordinates, ForecastData, GeocodingReponse, WeatherData } from "./apiTypes";
import { API_CONFIG } from "./config";


// Function to create dynamic URL 
function createUrl(endpoint: string, params: Record<string, string | number>) {
    const searchParams = new URLSearchParams({
        appid: API_CONFIG.API_URL,
        ...params
    })

    return `${endpoint}?${searchParams.toString()}`
}

// Generic fetch function 
async function fetchData<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Error Fetching Data: ${res.statusText}`)
    }

    return res.json();
}

// Current weather based on lat and lon 
export async function getCurrentWeather({ lat, lon }: Coordinates): Promise<WeatherData> {
    // in params it accepts lat and lon of type coordinates

    // then use 'createUrl' to create the API endpoint. BASE_URL + {lat, lon, units: default_params.units} 
    const url = createUrl(`${API_CONFIG.BASE_URL}/weather`, {
        lat: lat,
        lon: lon,
        units: API_CONFIG.DEFAULT_PARAMS.units
    })

    // passing the url to the 'fetchData' function and returning the data
    return fetchData<WeatherData>(url)
}

// Complete 5 days forecast on lat and lon 
export async function getForecast({ lat, lon }: Coordinates): Promise<ForecastData> {
    const url = createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
        lat: lat,
        lon: lon,
        units: API_CONFIG.DEFAULT_PARAMS.units
    })

    return fetchData<ForecastData>(url);
}

// Turn coordinates into place names 
export async function reverseGeocode({ lat, lon }: Coordinates): Promise<GeocodingReponse[]> {
    const url = createUrl(`${API_CONFIG.GEO}/reverse`, {
        lat: lat,
        lon: lon,
        limit: API_CONFIG.DEFAULT_PARAMS.limit
    })

    return fetchData<GeocodingReponse[]>(url);
}

// Seach for locations 
export async function searchLocations(query: string): Promise<GeocodingReponse[]> {
    const url = createUrl(`${API_CONFIG.GEO}/direct`, {
        q: query,
        limit: 5
    })

    return fetchData<GeocodingReponse[]>(url);
}

export function getWeatherIcon(icon: string) {
    return `https://openweathermap.org/img/wn/${icon}@4x.png`
}