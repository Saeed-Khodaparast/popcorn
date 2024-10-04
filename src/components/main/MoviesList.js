import Movie from "./Movie";

export default function MoviesList({ movies, onMovieClick }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} onMovieClick={onMovieClick} />
      ))}
    </ul>
  );
}
