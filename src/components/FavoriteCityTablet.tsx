import type { FavoriteCityTabletProps } from '@/types/propsTypes'
import React from 'react'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { Loader2, X } from 'lucide-react'
import { useWeatherQuery } from '@/hooks/useWeather'
import { getWeatherIcon } from '@/api/weather'
import { useNavigate } from 'react-router-dom'

const FavoriteCityTablet = ({
    id,
    name,
    lat,
    lon,
    onRemove
}: FavoriteCityTabletProps) => {

    const { data: weather, isLoading } = useWeatherQuery({ lat, lon })
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
    }

    return (
        <div
            onClick={handleClick}
            className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
            role="button"
            tabIndex={0}
        >
            {!isLoading &&
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 h-6 w-6 rounded-full p-0  hover:text-destructive-foreground group-hover:opacity-100 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(id);
                        toast.error(`Removed ${name} from Favorites`);
                    }}
                >
                    <X className="h-4 w-4" />
                </Button>
            }

            {isLoading ? (
                <div className="flex h-8 items-center justify-center">
                    <Loader2 className="h-4 w-4 animate-spin" />
                </div>
            ) : weather ? (
                <>
                    <div className="flex items-center gap-2">
                        <img
                            src={getWeatherIcon(weather.weather[0].icon)}
                            alt={weather.weather[0].description}
                            className="h-8 w-8"
                        />
                        <div>
                            <p className="font-medium">{name}</p>
                            <p className="text-xs text-muted-foreground">
                                {weather.sys.country}
                            </p>
                        </div>
                    </div>
                    <div className="ml-auto text-right">
                        <p className="text-xl font-bold">
                            {Math.round(weather.main.temp)}°
                        </p>
                        <p className="text-xs capitalize text-muted-foreground">
                            {weather.weather[0].description}
                        </p>
                    </div>
                </>
            ) : null}
        </div>
    )
}

export default FavoriteCityTablet