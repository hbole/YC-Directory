"use server"

import {auth} from "@/auth";
import {parseServerActionResponse} from "@/lib/utils";
import slugify from "slugify";
import {writeClient} from "@/sanity/lib/write-client";

export const createPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await auth();

    if(!session) {
        return parseServerActionResponse({error: "Not signed in", status: "ERROR"});
    }

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key != 'pitch')
    );

    const slug = slugify(title as string, { lower: true, strict: true });
    try {
        const startup = {
            title,
            description,
            category,
            image: link,
            views: 0,
            slug: {
                _type: slug,
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session?.id
            },
            pitch,
        };

        const result = await writeClient.create({
            _type: "startup",
            ...startup
        });

        return parseServerActionResponse({
            ...result,
            status: "SUCCESS",
        });
    } catch (err) {
        return parseServerActionResponse({error: JSON.stringify(err), status: "ERROR"});
    }
}