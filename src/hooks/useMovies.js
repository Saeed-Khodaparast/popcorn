import { useState, useEffect } from "react";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const apiAccessMode = "https";
  const preAddress = apiAccessMode === "https" ? "https://corsproxy.io/?" : "";
  const key = "767c2e8a";

  useEffect(() => {
    if (query.trim().length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    const controller = new AbortController();

    setIsLoading(true);
    setError("");
    callback?.();

    fetch(`${preAddress}http://www.omdbapi.com/?apikey=${key}&s=${query}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        if (data.Response === "False") throw new Error("Movie not found");
        // console.log(data);
        setMovies(data.Search);
        setError("");
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          // console.log(error.message);
          setError(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return function () {
      controller.abort();
    };
  }, [query]);

  return { key, preAddress, query, movies, isLoading, error };
}
