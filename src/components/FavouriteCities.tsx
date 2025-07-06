import { useFavourite } from '@/hooks/useFavourite'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { ScrollBar } from './ui/scroll-area'
import FavoriteCityTablet from './FavoriteCityTablet'

const FavouriteCities = () => {

    const { favourites, removeFavourite } = useFavourite()

    return (
        <>
            {favourites.length > 0 &&
                <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
            }
            <ScrollArea className="w-full pb-4 overflow-x-auto">
                <div className="flex gap-4">
                    {favourites.map((city) => (
                        <FavoriteCityTablet
                            key={city.id}
                            {...city}
                            onRemove={() => removeFavourite.mutate(city.id)}
                        />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="mt-2" />
            </ScrollArea>
        </>
    )
}

export default FavouriteCities