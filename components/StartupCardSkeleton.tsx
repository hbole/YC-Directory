import React from 'react'
import {cn} from "@/lib/utils";
import {Skeleton} from "@/components/ui/skeleton";

const StartupCardSkeleton = () => {
    return (
        <>
            {[0, 1, 2, 3, 4].map((i: number) => (
                <li key={cn("skeleton", i)}>
                    <Skeleton className="startup-card_skeleton" />
                </li>
            ))}
        </>
    )
}
export default StartupCardSkeleton
