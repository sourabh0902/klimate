import type { FavouriteButtonProps } from '@/types/propsTypes'
import { Button } from './ui/button'
import { Star } from 'lucide-react'
import { useFavourite } from '@/hooks/useFavourite'
import { toast } from 'sonner'

const FavouriteButton = ({ data }: FavouriteButtonProps) => {

    const { addToFavourite, isFavourite, removeFavourite } = useFavourite()
    const isCurrentlyFavourite = isFavourite(data.coord.lat, data.coord.lon)

    const handleToggleFavorite = () => {
        if (isCurrentlyFavourite) {
            removeFavourite.mutate(`${data.coord.lat}-${data.coord.lon}`)
            toast.error(`Removed ${data.name} from Favourites`)
        } else {
            addToFavourite.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country,
            })
            toast.success(`Added ${data.name} to Favourites`)
        }
    }

    return (
        <Button
            variant={isCurrentlyFavourite ? "default" : "outline"}
            size={"icon"}
            className={isCurrentlyFavourite ? "bg-yellow-500 hover:bg-yellow-600" : ""}
            onClick={handleToggleFavorite}
        >
            <Star className={`h-4 w-4 ${isCurrentlyFavourite ? "fill-current" : ""}`} />
        </Button>
    )
}

export default FavouriteButton