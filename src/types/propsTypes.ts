import type { Coordinates, ForecastData, GeocodingReponse, WeatherData } from "@/api/apiTypes";

export interface GeolocationState {
    coordinates: Coordinates | null,
    error: string | null;
    isLoading: boolean;
}

export interface CurrentWeatherProps {
    data: WeatherData,
    location?: GeocodingReponse,
}

export interface HourlyTemperatureProps {
    data: ForecastData
}

export interface WeatherDetailsProps {
    data: WeatherData,
}

export interface WeatherForecastProps {
    data: ForecastData,
}

export interface DailyForecast {
    date: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: {
        id: number;
        main: string;
        description: string;
        icon: string;
    };
}

export interface SearchHistoryItem {
    id: string;
    query: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    searchedAt: number;
}

export interface FavouriteCity {
    id: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    state?: string;
    addedAt: number;
}

export interface FavouriteButtonProps {
    data: WeatherData
}

export interface FavoriteCityTabletProps {
    id: string;
    name: string;
    lat: number;
    lon: number;
    onRemove: (id: string) => void;
}

