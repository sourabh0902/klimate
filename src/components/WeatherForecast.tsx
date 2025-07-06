import { formatTemp } from '@/hooks/useFormatTemp';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import type { DailyForecast, WeatherForecastProps } from '@/types/propsTypes'
import { format } from "date-fns";
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';

const WeatherForecast = ({ data }: WeatherForecastProps) => {

    // const [forecastData, setForecastData] = useState<DailyForecast[] | null>(null)

    // Group forecast by day and get daily min/max
    const dailyForecasts = data.list.reduce((acc, forecast) => {

        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

        if (!acc[date]) {
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt,
            };
        } else {
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }

        return acc;

    }, {} as Record<string, DailyForecast>)

    // Get next 5 days
    const nextDays = Object.values(dailyForecasts).slice(1, 6);

    // useEffect(() => {
    //     if (Object.keys(dailyForecasts).length < 5) {
    //         setForecastData(Object.values(dailyForecasts))
    //     } else {
    //         setForecastData(nextDays)
    //     }
    // }, [])

    return (
        <Card className='flex-1'>
            <CardHeader>
                <CardTitle>
                    {nextDays && `${nextDays?.length} day forecast`}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    {nextDays && nextDays.map((forecast: DailyForecast, index: number) => (

                        <div
                            key={index}
                            className="grid grid-cols-3 items-center gap-4 rounded-lg border p-4"
                        >
                            <div>
                                <p className="font-medium">
                                    {format(new Date(forecast.date * 1000), "EEE, MMM d")}
                                </p>
                                <p className="text-sm text-muted-foreground capitalize">
                                    {forecast.weather.description}
                                </p>
                            </div>

                            <div className="flex justify-center gap-4">
                                <span className="flex items-center text-blue-500">
                                    <ArrowDown className="mr-1 h-4 w-4" />
                                    {formatTemp(forecast.temp_min)}
                                </span>
                                <span className="flex items-center text-red-500">
                                    <ArrowUp className="mr-1 h-4 w-4" />
                                    {formatTemp(forecast.temp_max)}
                                </span>
                            </div>

                            <div className="flex justify-end gap-4">
                                <span className="flex items-center gap-1">
                                    <Droplets className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm">{forecast.humidity}%</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <Wind className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm">{forecast.wind}m/s</span>
                                </span>
                            </div>

                        </div>
                    ))}

                </div>
            </CardContent>
        </Card>
    )
}

export default WeatherForecast