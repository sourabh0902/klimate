import React from 'react'
import { Skeleton } from './ui/skeleton'
import { useFavourite } from '@/hooks/useFavourite'

export const SkeletonLoading = () => {

    const { favourites } = useFavourite()
    return (
        <div className="space-y-6">
            {favourites.length > 0 &&
                <div className='flex gap-6'>
                    <Skeleton className="h-[106px] w-[24%] rounded-lg" />
                    <Skeleton className="h-[106px] w-[24%] rounded-lg" />
                    <Skeleton className="h-[106px] w-[24%] rounded-lg" />
                    <Skeleton className="h-[106px] w-[24%] rounded-lg" />
                </div>
            }
            <div className="grid gap-6">
                <div className='flex flex-col lg:flex-row gap-6'>
                    <Skeleton className="h-[300px] w-full lg:w-[40%] rounded-lg" />
                    <Skeleton className="h-[300px] w-full lg:w-[60%] rounded-lg" />
                </div>
                <div className="flex flex-col lg:flex-row gap-6">
                    <Skeleton className="h-[300px] w-full lg:w-1/2 rounded-lg" />
                    <Skeleton className="h-[500px] w-full lg:w-1/2 rounded-lg" />
                </div>
            </div>
        </div>
    )
}

export const CityPageLoading = () => {
    return (
        <div className="space-y-6">
            <div className="grid gap-6">
                <div className='flex gap-6'>
                    <Skeleton className="h-[300px] w-[40%] rounded-lg" />
                    <Skeleton className="h-[300px] w-[60%] rounded-lg" />
                </div>
                <div className="flex gap-6">
                    <Skeleton className="h-[300px] w-1/2 rounded-lg" />
                    <Skeleton className="h-[500px] w-1/2 rounded-lg" />
                </div>
            </div>
        </div>
    )
}

