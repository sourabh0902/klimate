import type { CurrentWeatherProps } from '@/types/propsTypes'
import React from 'react'
import { Card, CardContent } from './ui/card';
import { formatTemp } from '@/hooks/useFormatTemp';
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';
import { getWeatherIcon } from '@/api/weather';

const CurrentWeather = ({ data, location }: CurrentWeatherProps) => {

    const {
        weather: [CurrentWeather],
        main: { feels_like, temp, temp_max, temp_min, humidity },
        wind: { speed },
    } = data;

    return (
        <Card className='overflow-hidden'>
            <CardContent className='h-full flex flex-col justify-start items-start gap-3'>

                {/* Location  */}
                <div className='flex items-baseline-last gap-0.5'>
                    {location?.name &&
                        <h2 className='text-2xl font-bold tracking-tighter'>{location?.name}</h2>
                    }
                    {location?.state &&
                        <span className='text-muted-foreground'>, {location?.state}</span>
                    }
                    {location?.country &&
                        <p className='text-sm text-muted-foreground'>, {location?.country}</p>
                    }
                </div>

                {/* Temp + curr weather  */}
                <div className='grid gap-6 md:grid-cols-2 m-auto'>

                    {/* Temps  */}
                    <div className='flex flex-col space-y-2'>

                        {/* Temp, feels like, temp_min, temp_max  */}
                        <div className='flex items-center gap-4'>
                            <h2 className='text-7xl font-bold tracking-tighter'>{formatTemp(temp)}</h2>
                            <div className='space-y-1'>
                                <p className='text-sm font-medium text-muted-foreground'>Feels like {formatTemp(feels_like)}</p>
                                <div className='flex gap-1 justify-between text-sm font-medium'>
                                    <p className='flex items-center gap-1 text-blue-500'><ArrowDown className='h-3 w-3' />{formatTemp(temp_min)}</p>
                                    <p className='flex items-center gap-1 text-red-500'><ArrowUp className='h-3 w-3' />{formatTemp(temp_max)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Humidity, wind speed  */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <Droplets className="h-4 w-4 text-blue-500" />
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Humidity</p>
                                    <p className="text-sm text-muted-foreground">{humidity}%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Wind className="h-4 w-4 text-blue-500" />
                                <div className="space-y-0.5">
                                    <p className="text-sm font-medium">Wind Speed</p>
                                    <p className="text-sm text-muted-foreground">{speed} m/s</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Current Weather  */}
                    <div className='max-h-[122px] h-full'>
                        {getWeatherIcon(CurrentWeather.icon) ? (
                            <img src={getWeatherIcon(CurrentWeather.icon)} alt="" className='w-full h-full object-cover' />
                        ) : (
                            <img src="/weather-forecast.png" alt="" className='w-full h-full object-contain' />
                        )
                        }
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}

export default CurrentWeather