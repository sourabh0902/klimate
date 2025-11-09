# Klimate Weather Application Documentation

## Overview
Klimate is a modern weather application leveraging the OpenWeather API to provide real-time weather data, city search, and user-centric features such as favorites and search history. The app is built with React, TypeScript, and TanStack Query for robust async data management and caching.

---

## Project Structure

- `src/components/`: Reusable UI and feature components (e.g., weather display, search, favorites).
- `src/components/ui/`: Low-level UI primitives (e.g., button, card, dialog, skeleton loaders).
- `src/hooks/`: Custom React hooks for encapsulating logic (e.g., geolocation, favorites, weather fetching, local storage).
- `src/api/`: API configuration and fetch logic for weather and geocoding.
- `src/pages/`: Top-level page components (e.g., dashboard, city page).
- `src/context/`: Context providers (e.g., theme management).
- `src/lib/`: Utility functions.
- `src/types/`: TypeScript type definitions for props and data models.
- `src/assets/`: Static assets (e.g., images, icons).
- `src/tests/`: Test files and utilities.

---

## API Integration

1. **OpenWeather API**: Fetches weather data using latitude and longitude. Note: Sometimes the city name may be inaccurate.
2. **Reverse Geocoding API**: Used to obtain accurate city names by passing latitude and longitude.

---

## State Management

- **TanStack Query**: Handles async data fetching, caching, background updates, and error handling. Utilized for weather data, search history, and favorites.
- **React Context**: Used for global state such as theme management (`src/context/theme-provider.tsx`).

---

## Component Communication

- Data is primarily shared via props and custom hooks.
- Global state (e.g., theme) is managed with React Context.
- Hooks like `useWeather`, `useFavourite`, and `useSearchHistory` encapsulate logic and state, promoting reusability and separation of concerns.

---

## Data Fetching & Caching

- **navigator.geolocation.getCurrentPosition**: Fetches the user's current latitude and longitude from the browser.
- **Caching**: Weather data for a city is cached for 10 minutes using TanStack Query's `queryKey` and `QueryClient` with custom `defaultOptions`. If a user revisits a city within this period, cached data is shown for performance.
- **Query Functions**: Centralized in `src/api/weather.ts` and used by hooks in `src/hooks/useWeather.ts`.

---

## Error Handling

- API errors are surfaced via TanStack Query's error state.
- User-facing errors are displayed using toast notifications (`components/ui/sonner.tsx`).
- Built-in retries and error boundaries are leveraged for resilience.

---

## UI/UX Libraries

- Custom UI components are located in `src/components/ui/`.
- Responsive design is implemented for mobile, tablet, and desktop.
- Skeleton loaders and cards enhance perceived performance and user experience.

---

## Custom Hooks

- **useLocalStorage**: Provides a React-like API for local storage, enabling persistent state.
- **useSearchHistory**: Manages search history with local storage and React Query, supporting add, clear, and deduplication.
- **useFavourite**: Manages favorite cities, supporting add, remove, and check operations.
- **useWeather**: Fetches and caches weather data for a given location.
- **useGeolocation**: Retrieves the user's current coordinates.
- **useFormatTemp, useDateFormatter, useWindDirection**: Utility hooks for formatting and display.

---

## Testing

- Test files are located in `src/tests/`.
- [Add details about testing tools and coverage if applicable.]

---

## Performance Optimizations

- Data caching with TanStack Query reduces redundant API calls.
- Skeleton loaders and lazy loading improve perceived performance.
- Efficient state management and memoization minimize unnecessary re-renders.

---

## Accessibility

- Semantic HTML and ARIA attributes are used where appropriate.
- Keyboard navigation is supported in custom UI components.
- [Expand with more details if specific a11y features are implemented.]

---

## Deployment & Environment

- **Local Development**: `npm install && npm run dev`
- **Production Build**: `npm run build`
- **Environment Variables**: Requires OpenWeather API key and endpoint URLs (ensure HTTPS is used to avoid mixed content issues).

---

## API Rate Limiting & Error Scenarios

- OpenWeather API has rate limits; excessive requests may result in failures.
- The app uses TanStack Query's retry and error handling features to manage transient errors.
- Fallback UI and notifications are shown on error states.

---

## Extending the App

- To add a new feature (e.g., a new page or API integration):
    1. Create a new component or page in `src/components/` or `src/pages/`.
    2. Add any necessary hooks in `src/hooks/`.
    3. Update API logic in `src/api/` as needed.
    4. Register new routes or context providers if required.

---

## Known Issues or Limitations

- Geolocation may not work on all browsers or devices.
- OpenWeather API may return inaccurate city names; reverse geocoding is used as a fallback.
- API rate limits may affect frequent users.
- [Add any other known issues or browser compatibility notes.]

---

## Credits & Resources

- [OpenWeather API](https://openweathermap.org/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

## Learnings & Best Practices

- Advanced object and array destructuring from API responses for concise data extraction.
- Leveraging TanStack Query for automatic caching, background updates, and error handling.
- Custom hooks for local storage and state management.
- Ensuring secure API requests by using HTTPS endpoints.

---

## Function Flows (Example: Fetching Current Weather)

1. **API Layer** (`src/api/weather.ts`): `getCurrentWeather(lat, lon)` fetches weather data.
2. **Hook Layer** (`src/hooks/useWeather.ts`): `useWeatherQuery(lat, lon)` uses TanStack Query to fetch/cache data and manage loading/error states.
3. **Page Layer** (`src/pages/dashboard.tsx`): `const weatherData = useWeatherQuery(coordinates)` retrieves and displays weather data, with access to refetch, error, and data states.

---

For further details, refer to the codebase and inline comments. For questions or contributions, please see the README or contact the maintainer.
