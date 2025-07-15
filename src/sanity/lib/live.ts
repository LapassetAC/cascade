// Temporary workaround: Using regular client instead of live due to type conflicts
// TODO: Re-enable live functionality once next-sanity types are compatible
import { client } from "./client";

// Fallback to regular client.fetch instead of live sanityFetch
export const sanityFetch = client.fetch.bind(client);

// Placeholder SanityLive component
export const SanityLive = () => null;
