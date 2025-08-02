import CurrentWeather from '@/components/CurrentWeather'
import FavouriteCities from '@/components/FavouriteCities'
import HourlyTemperature from '@/components/HourlyTemp'
import { SkeletonLoading } from '@/components/SkeletonLoading'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import WeatherDetails from '@/components/WeatherDetails'
import WeatherForecast from '@/components/WeatherForecast'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/useWeather'
import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react'

const Dashboard = () => {

    const { coordinates, error: locationError, fetchLocation, isLoading: locationLoading } = useGeolocation()

    const locationData = useReverseGeocodeQuery(coordinates)
    const weatherData = useWeatherQuery(coordinates)
    const forecastData = useForecastQuery(coordinates)

    const locationName = locationData.data?.[0];

    const handleRefresh = () => {
        fetchLocation();
        if (coordinates) {
            //reload weather, location and forecast data
            locationData.refetch()
            weatherData.refetch()
            forecastData.refetch()
        }
    }

    if (locationLoading) {
        return <SkeletonLoading />
    }

    if (locationError) {
        return <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription className="flex flex-col gap-4">
                <p>{locationError}</p>
                <Button variant="outline" onClick={fetchLocation} className="w-fit">
                    <MapPin className="mr-2 h-4 w-4" />
                    Enable Location
                </Button>
            </AlertDescription>
        </Alert>
    }

    if (!coordinates) {
        return (
            <Alert>
                <MapPin className="h-4 w-4" />
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Please enable location access to see your local weather.</p>
                    <Button variant="outline" onClick={fetchLocation} className="w-fit">
                        <MapPin className="mr-2 h-4 w-4" />
                        Enable Location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (weatherData.error || forecastData.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Failed to fetch weather data. Please try again.</p>
                    <Button variant="outline" onClick={handleRefresh} className="w-fit">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Retry
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherData.data || !forecastData.data) {
        return <SkeletonLoading />;
    }


    /**
     * 1. Fetch current location data
     * 2. creating forecast 
     * 3. make reverse geo coding api + get name of the city 
     * 4. 
     */

    return (
        <div className='space-y-4'>
            {/* Favourite Cities  */}
            <FavouriteCities />

            {/* Current Location + Refresh button  */}
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-bold tracking-tight'>Current Location</h1>
                <Button
                    variant={'outline'}
                    size={'icon'}
                    onClick={handleRefresh}
                    disabled={weatherData.isFetching || forecastData.isFetching}
                >
                    <RefreshCw
                        className={`h-4 w-4 
                            ${weatherData.isFetching ? "animate-spin" : ""}`}
                    />
                </Button>
            </div>

            <div className='grid gap-6'>
                <div className='flex flex-col lg:flex-row gap-6'>
                    {/* Current Weather  */}
                    <CurrentWeather data={weatherData.data} location={locationName} />
                    {/* hourly temp  */}
                    <HourlyTemperature data={forecastData.data} />
                </div>

                <div className='flex flex-col lg:flex-row gap-6'>
                    {/* Weather details  */}
                    <WeatherDetails data={weatherData.data} />
                    {/* forecast  */}
                    <WeatherForecast data={forecastData.data} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard