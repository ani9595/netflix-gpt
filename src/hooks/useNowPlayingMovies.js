import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, API_GET_MOVIES } from "../utils/constant";
import { addNowPlayingMovies } from "../utils/movieSlice";

const useNowPlayingMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const nowPlayingMovies = useSelector((store) => store.movie.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    const response = await fetch(API_GET_MOVIES, API_OPTIONS);
    const data = await response.json();
    dispatch(addNowPlayingMovies(data.results));
  };

  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
