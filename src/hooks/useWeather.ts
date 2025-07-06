import type { Coordinates } from "@/api/apiTypes";
import { getCurrentWeather, getForecast, reverseGeocode, searchLocations } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WeatherKeys = {
    weather: (coords: Coordinates) => ['weather', coords] as const,
    forecast: (coords: Coordinates) => ['forecast', coords] as const,
    location: (coords: Coordinates) => ['location', coords] as const,
    search: (query: string) => ['location-search', query] as const,
} as const;

export function useWeatherQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WeatherKeys.weather(coordinates ?? { lat: 0, lon: 0 }),

        // The main function to fetch the data
        // Defines what data should be fetched
        queryFn: () =>
            coordinates ? getCurrentWeather(coordinates) : null,
        // only fetch if the coordinates are not null
        enabled: !!coordinates,
    })
}

export function useForecastQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WeatherKeys.forecast(coordinates ?? { lat: 0, lon: 0 }),

        // The main function to fetch the data 
        queryFn: () =>
            coordinates ? getForecast(coordinates) : null,
        enabled: !!coordinates,
    })
}

export function useReverseGeocodeQuery(coordinates: Coordinates | null) {
    return useQuery({
        queryKey: WeatherKeys.location(coordinates ?? { lat: 0, lon: 0 }),

        // The main function to fetch the data 
        queryFn: () =>
            coordinates ? reverseGeocode(coordinates) : null,
        enabled: !!coordinates,
    })
}

export function useSearchLocation(query: string) {
    return useQuery({
        queryKey: WeatherKeys.search(query),

        // The main function to fetch the data 
        queryFn: () =>
            query ? searchLocations(query) : null,
        enabled: query.length >= 3,
    })
}