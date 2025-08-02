import type { WeatherDetailsProps } from '@/types/propsTypes'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { formatTime } from '@/hooks/useDateFormatter';
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react';
import { getWindDirection } from '@/hooks/useWindDirection';

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
    const { main, sys, wind } = data;

    const details = [
        {
            title: 'Sunrise',
            value: formatTime(sys.sunrise),
            icon: Sunrise,
            color: 'text-orange-500'
        },
        {
            title: 'Sunset',
            value: formatTime(sys.sunset),
            icon: Sunset,
            color: 'text-blue-500'
        },
        {
            title: 'Wind Direction',
            value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
            icon: Compass,
            color: 'text-green-500'
        },
        {
            title: 'Pressure',
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: 'text-purple-500'
        }
    ]

    return (
        <Card className='flex-1 h-max'>
            <CardHeader>
                <CardTitle>
                    Weather Details
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid gap-6 sm:grid-cols-2">
                    {details && details?.map((item) => (
                        <div
                            key={item.title}
                            className="flex items-center gap-3 rounded-lg border p-4"
                        >
                            <item.icon className={`h-5 w-5 ${item.color}`} />
                            <div>
                                <p className="text-sm font-medium leading-none">
                                    {item.title}
                                </p>
                                <p className="text-sm text-muted-foreground">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default WeatherDetails