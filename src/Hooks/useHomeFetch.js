import { useState, useEffect } from "react";
import API from "../API";

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async (page, searchTerm = "") => {
    try {
      setError(false);
      setLoading(true);
      const movies = await API.fetchMovies(searchTerm, page);
      console.log(movies.results);
      setState(movies.data);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  return { state, loading, setSearchTerm, error };
};
