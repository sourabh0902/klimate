import CurrentWeather from '@/components/CurrentWeather'
import FavouriteButton from '@/components/FavouriteButton'
import HourlyTemperature from '@/components/HourlyTemp'
import { CityPageLoading } from '@/components/SkeletonLoading'
import { Alert, AlertDescription } from '@/components/ui/alert'
import WeatherDetails from '@/components/WeatherDetails'
import WeatherForecast from '@/components/WeatherForecast'
import { useForecastQuery, useWeatherQuery } from '@/hooks/useWeather'
import { AlertTriangle } from 'lucide-react'
import { useParams, useSearchParams } from 'react-router-dom'

const CityPage = () => {

    const [searchParams] = useSearchParams()
    const params = useParams()

    const lat = parseFloat(searchParams.get('lat') || '0')
    const lon = parseFloat(searchParams.get('lon') || '0')

    const coordinates = { lat, lon }

    const weatherData = useWeatherQuery(coordinates)
    const forecastData = useForecastQuery(coordinates)

    if (weatherData.error || forecastData.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                    Failed to load weather data. Please try again.
                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherData.data || !forecastData.data || !params.cityName) {
        return <CityPageLoading />
    }

    return (
        <div className='space-y-4'>

            {/* Searched Location + Favourite button  */}
            <div className='flex items-center justify-between'>

                {/* Location  */}
                <div className='flex items-baseline-last gap-0.5'>
                    {params?.cityName &&
                        <h2 className='text-2xl font-bold tracking-tighter'>{params?.cityName}</h2>
                    }
                    {weatherData?.data?.sys?.country &&
                        <p className='text-sm text-muted-foreground'>, {weatherData?.data?.sys?.country}</p>
                    }
                </div>

                {/* Favourites Button  */}
                <FavouriteButton data={{ ...weatherData.data, name: params.cityName }} />
            </div>

            <div className='grid gap-6'>
                {/* Current Weather  */}
                <CurrentWeather data={weatherData.data} />
                {/* hourly temp  */}
                <HourlyTemperature data={forecastData.data} />

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

export default CityPage