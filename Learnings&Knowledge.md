1. Using openweather api to get the result by passing lat and long. But sometimes it doesnt provide accurate city name, so for that we'll be using the Reverse geocoding api.

2. Reverse geocoding - In this we'll pass the lat, long to get the accurate city name

3. Tanstack query - Powerful async operation tool 
    Usage - 
        1. For caching and checking if the data has been changed for a city then only fetch otherwise not. 
        2. For automatic state management, no manual refetching the data.
        3. Automatic Caching and Background Updates
        4. Built-in Error Handling and Retries


4. navigator.geolocation.getCurrentPosition is used for fetching the current lat and lon of the user from browser then using it across different components.

5. One functionality is that, suppose I have seen the weather data of Delhi, and then visited to some other pages like Mumbai or UAE and within 10 minutes I came back to Delhi page so I wont fetch the data again, I'll be showing the cached data which will improve the performance and fetching of unwanted data. We can leverage the benefit of useQuery hook over here and it's queryKey property. 

6. How we gonna define the fresh data and caching of the data?
    For that we can use 'QueryClient' in the App.tsx which accepts an object with defaultOptions as key.
    'queryFn' the main function to fetch the data for location, reversegeocode and weather data.

7. Function flows - (Ex: fetching current weather of a location (remaining both are also preeety same))
    1. weather.ts --> getCurrentWeather() : takes in lat and lon and returns the fetched data 
     
    2. useWeather.ts -->  useWeatherQuery() : takes in lat and lon and returns the fetched data. With tanstack query, we can cache the data, it will automatic refetch if the certain criteria is met. Automatically handles the loading and error state.
     
    3. dashboard.tsx --> const weatherData = useWeatherQuery(coordinates) : 
    Later we can use the methods which tanstack provides us. Ex, weatherData.refetch() to call the API and fetch the data. weatherData.error, weatherData.data, etc. 


8. Learnings - 
    1. New way of objects and array destructuring from an API response object
        Eg:     
        const {
            weather: [CurrentWeather],
            main: { feels_like, temp, temp_max, temp_min, humidity },
            wind: { speed },
        } = data;

        so, weather, main, wind all are props of the object. And each array and objects are destructured with their required props/elements

9. custom local storage hook, via which we can get the stored items as well as can set the items in local storage just like a usestate hook. 

10. useSearchHistory hook : 

- Purpose:
    - Manages a user's search history using local storage and React Query for caching and state management.

- Returns:
    - history: The current search history (from React Query, kept in sync with local storage).
    - addToHistory: Mutation to add a new search to the history (removes duplicates, keeps max 10).
    - clearHistory: Mutation to clear the entire search history.

- How it works:
    - Uses a custom useLocalStorage hook to persist history in the browser.
    - Uses React Query's useQuery to provide and cache the history.
    - addToHistory mutation adds a new search, removes any previous entry with the same coordinates, and updates both local storage and the React Query cache.
    - clearHistory mutation clears the history from both local storage and the c

11. useFavourite hook is also similar like the useSearchHistory. It also has getFavourite method, isFavourite, removeFavourite, addToFavourite

12. NOTE: openwaetherapi uses 'http' and Modern browsers block "mixed content" (HTTP requests from HTTPS pages) for security. So, Update your API URLs to use https:// instead of http:// in config for BASE_URL and GEO