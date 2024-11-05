import React from 'react'
import {client} from "@/sanity/lib/client";
import {FETCH_STARTUPS_BY_AUTHOR_QUERY} from "@/sanity/lib/queries";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import {startup} from "@/sanity/schemaTypes/startup";

const UserStartups = async ({ id } : { id: string }) => {
    const startups = await client.fetch(FETCH_STARTUPS_BY_AUTHOR_QUERY, {id});
    return (
        <>
            {
                startups.length > 0 ? startups.map((startup: StartupTypeCard) => (
                    <StartupCard key={startup._id} post={startup} />
                )) : (
                    <p className="no-results">No Startups found</p>
                )
            }
        </>
    )
}
export default UserStartups
