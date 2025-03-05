# Temporal Pokémon Database

Search & browse Pokémon with this application.

## Technologies Used

> Typescript, React, React-Router, TanStack Query, TailwindCSS, Catalyst UI Components, Zod, Zustand, Vite

## Overview

This application is a fairly simple react-router SPA with two routes. There is a home page, which implements the search functionality and there is a pokemon detail page.

Most of the complicated networking, error handling and retry logic is handled through Tanstack Query, sicne it has strong built-in support for such patterns. For example, if an error is detected (the query function throws an error), the query is automatically retried, as per the configuration. Infinite loading is also managed through react-query primitives, where we simply create a method to get the next page token, and send the next API request with that token. You can see this in `./src/hooks/queries/usePokemonSearch.ts`.

```typescript
const searchQuery = useInfiniteQuery({
  queryKey: ['useSearch', { searchTerm, chaos, flakiness }],
  queryFn: async ({ pageParam }) => {
    const url = buildSearchApiUrl({
      searchTerm: searchTerm,
      pageParam,
      chaos,
      flakiness,
    });
    const res = await fetch(url);
    const json = await res.json();
    const parsedResponse = pokemonSearchResponse.safeParse(json);
    if (parsedResponse.error) {
      if (json.error === 'Page out of bounds') {
        throw new NotFoundError();
      }
      throw new Error(json.error || 'An error occurred');
    }
    return parsedResponse.data;
  },
  enabled: searchTerm !== '',
  getNextPageParam: (lastPage) => lastPage?.nextPage,
  initialPageParam: undefined as string | undefined, // casting for type inference
});
```

To test the error & non-happy paths, I've added a sidebar settings with user-controlled inputs to simulate the failure modes.

I used zustand for a small global store, to keep track of the application settings & current search term.
Storing in a global store, allows the user to preserve their search state between page navigations.

## Build Info

### Start Dev Server

To start the development server, run the following command:

```bash
npm run dev
```

### Build the app

To build the application with tsc & vite

```bash
npm run build
```

### Lint

To lint the application

```bash
npm run lint
```
