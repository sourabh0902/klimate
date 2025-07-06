import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Clock, Loader2, Search, Star, XCircle, } from 'lucide-react'
import { useSearchLocation } from '@/hooks/useWeather'
import { useNavigate } from 'react-router-dom'
import { useSearchHistory } from '@/hooks/useSearchHistory'
import { format } from 'date-fns'
import { useFavourite } from '@/hooks/useFavourite'

const CitySearch = () => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const navigate = useNavigate();

    const { data: locations, isLoading } = useSearchLocation(query);
    const { history, addToHistory, clearHistory } = useSearchHistory()
    const { favourites } = useFavourite();
    // console.log(locations)

    const handleLocationClick = (cityData: string) => {
        const [lat, lon, name, country] = cityData.split('|');

        // Add to search history 
        addToHistory.mutate({
            query,
            name,
            lat: parseFloat(lat),
            lon: parseFloat(lon),
            country,
        })

        setOpen(false)
        setQuery('')
        navigate(`/city/${name}?lat=${lat}&lon=${lon}`)
    }

    return (
        <>
            <Button
                variant="outline"
                className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
                onClick={() => setOpen(true)}
            >
                <Search className="mr-2 h-4 w-4" />
                Search cities...
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput
                    onValueChange={setQuery}
                    value={query}
                    placeholder="Search..." />
                <CommandList>
                    {query.length > 2 && !isLoading && (
                        <CommandEmpty>No cities found.</CommandEmpty>
                    )}
                    {favourites && favourites.length > 0 &&
                        <CommandGroup heading="Favourites">
                            {favourites.map((fav) => (
                                <CommandItem
                                    key={`${fav.lat} - ${fav.lon}`}
                                    value={`${fav.lat}|${fav.lon}|${fav.name}|${fav.country}`}
                                    onSelect={handleLocationClick}
                                    className='gap-0 flex justify-between'
                                >
                                    <span className='flex justify-center items-center'>
                                        <Star className="mr-4 h-3 w-3 text-yellow-500" />
                                        <span>{fav.name}</span>
                                        {fav.state && (
                                            <span className='text-sm text-muted-foreground'>, {fav.state}</span>
                                        )}
                                        {fav.country && (
                                            <span className='text-sm text-muted-foreground'>, {fav.country}</span>
                                        )}
                                    </span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    }

                    {history.data && history.data.length > 0 && (
                        <>
                            <CommandSeparator />
                            <CommandGroup>
                                <div className='flex justify-between items-center px-2 my-2'>
                                    <p className='text-xs text-muted-foreground'>Recent Searches</p>
                                    <Button
                                        variant='destructive'
                                        size='sm'
                                        onClick={() => clearHistory.mutate()}
                                    >
                                        <span className='flex items-center justify-center gap-2'>
                                            <XCircle className='h-3 w-3' />
                                            {/* <p className='text-xs'> Clear </p> */}
                                        </span>
                                    </Button>
                                </div>
                                {history.data.map((location) => {
                                    return <CommandItem
                                        key={`${location.lat} - ${location.lon}`}
                                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                        onSelect={handleLocationClick}
                                        className='gap-0 flex justify-between'
                                    >
                                        <span className='flex justify-center items-center'>
                                            <Clock className="mr-4 h-3 w-3" />
                                            <span>{location.name}</span>
                                            {location.state && (
                                                <span className='text-sm text-muted-foreground'>, {location.state}</span>
                                            )}
                                            {location.country && (
                                                <span className='text-sm text-muted-foreground'>, {location.country}</span>
                                            )}
                                        </span>
                                        {location.searchedAt && (
                                            <span className='text-sm text-muted-foreground'>{format(location.searchedAt, "MMM d, h:mm a")}</span>
                                        )}
                                    </CommandItem>
                                }
                                )}

                            </CommandGroup>
                        </>
                    )}

                    <CommandSeparator />

                    {locations && locations.length > 0 && (
                        <CommandGroup heading="Suggestions">
                            {isLoading && (
                                <div className="flex items-center justify-center p-4">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                            )}
                            {locations?.map((location) => (
                                <CommandItem
                                    key={`${location.lat} - ${location.lon}`}
                                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                                    onSelect={handleLocationClick}
                                    className='gap-0'
                                >
                                    <Search className="mr-4 h-3 w-3" />
                                    <span>{location.name}</span>
                                    {location.state && (
                                        <span className='text-sm text-muted-foreground'>, {location.state}</span>
                                    )}
                                    {location.country && (
                                        <span className='text-sm text-muted-foreground'>, {location.country}</span>
                                    )}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    )}

                </CommandList>
            </CommandDialog>
        </>
    )
}

export default CitySearch