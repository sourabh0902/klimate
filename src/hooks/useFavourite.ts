import type { FavouriteCity } from "@/types/propsTypes";
import { useLocalStorage } from "./useLocalStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFavourite() {

    const [favourite, setFavourite] = useLocalStorage<FavouriteCity[]>('favourite', [])

    const queryClient = useQueryClient()

    //  Getting the Favourite
    const FavouriteQuery = useQuery({
        queryKey: ['favourite'],
        queryFn: () => favourite, // Returns current favourites from localstorage
        initialData: favourite,
        staleTime: Infinity,
    })

    // Function to run when favouriting a new city
    const addToFavourite = useMutation({
        mutationFn: async (city: Omit<FavouriteCity, 'id' | 'addedAt'>) => {

            // a new city object with id and addedAt
            const newFavourite: FavouriteCity = {
                ...city,
                id: `${city.lat}-${city.lon}`,
                addedAt: Date.now(),
            };

            const exists = favourite.some((fav) => fav.id === newFavourite.id)
            if (exists) return favourite;

            const newFavourites = [...favourite, newFavourite].slice(0, 10);

            setFavourite(newFavourites)
            return newFavourites;
        },

        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["favourite"] });
        },
    })

    const removeFavourite = useMutation({
        mutationFn: async (cityID: string) => {
            const newFavourites = favourite.filter((city) => city.id !== cityID)
            setFavourite(newFavourites)
            return newFavourites;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favourite"] });
        }
    })

    const isFavourite = (lat: number, lon: number) => {
        return favourite.some((city) => city.lat === lat && city.lon === lon)
    }

    return {
        favourites: FavouriteQuery.data,
        addToFavourite,
        removeFavourite,
        isFavourite
    }


}