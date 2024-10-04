import { useEffect, useState } from "react";
import NavBar from "./components/topBar/NavBar";
import Logo from "./components/topBar/Logo";
import Search from "./components/topBar/Search";
import Result from "./components/topBar/Result";
import Main from "./components/main/Main";
import Loader from "./components/main/Loader";
import ErrorMessage from "./components/main/ErrorMessage";
import Tab from "./components/main/Tab";
import TabContent from "./components/main/TabContent";
import ListBox from "./components/main/ListBox";
import MoviesList from "./components/main/MoviesList";
import Summary from "./components/main/Summary";
import MovieDetails from "./components/main/MovieDetails";
import WatchedList from "./components/main/WatchedList";
import WatchedBox from "./components/main/WatchedBox";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocalStorage";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [watched, setWatched] = useState(function () {
    return JSON.parse(localStorage.getItem("watched"));
  });
  const { key, preAddress, movies, isLoading, error } = useMovies(
    query,
    handleCloseMovie
  );

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  // #region handlers

  function handleSearch(e) {
    if (e === "") {
      setQuery("");
      return;
    }
    setQuery(e.target.value);
  }

  function handleMovieClick(id) {
    id !== selectedId ? setSelectedId(id) : setSelectedId(null);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  function handleActiveTab(index) {
    setActiveTab(index);
  }

  // #endregion handlers -------------------

  // jsx
  return (
    <div className="container">
      <NavBar>
        <Logo />
        <Search query={query} onSetQuery={handleSearch} />
        <Result movies={movies} />
      </NavBar>
      <Tab activeTab={activeTab} onChangeTab={handleActiveTab}>
        <TabContent>
          {activeTab === 0 && (
            <ListBox>
              {isLoading && <Loader />}
              {!isLoading &&
                !error &&
                (selectedId !== null ? (
                  <MovieDetails
                    apiKey={key}
                    apiPreAddress={preAddress}
                    selectedId={selectedId}
                    onCloseMovie={handleCloseMovie}
                    onAddwatched={handleAddWatched}
                    watched={watched}
                  />
                ) : (
                  <MoviesList movies={movies} onMovieClick={handleMovieClick} />
                ))}
              {error && <ErrorMessage message={error} />}
            </ListBox>
          )}
          {activeTab === 1 && (
            <WatchedBox>
              <>
                <Summary watched={watched} />
                <WatchedList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
            </WatchedBox>
          )}
        </TabContent>
      </Tab>
      <Main>
        <ListBox>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onMovieClick={handleMovieClick} />
          )}
          {error && <ErrorMessage message={error} />}
        </ListBox>
        <WatchedBox>
          {selectedId !== null ? (
            <MovieDetails
              apiKey={key}
              apiPreAddress={preAddress}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddwatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
              {/* <StarRating
                messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
                maxRating={5}
                color="#55ff66"
                size={24}
                className="test"
              /> */}
            </>
          )}
        </WatchedBox>
      </Main>
    </div>
  );
}
