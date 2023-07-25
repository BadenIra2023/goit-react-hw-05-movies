import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const API_KEY = "7da6375676c882cd7263be89e48276aa";

export const fetchFilms = async () => {
    const response = await axios.get
    (`/trending/all/day?api_key=${API_KEY}`)
    return response.data.results;
}

export const fetchFilmDetails = async (filmId) => {
    const response = await axios.get
        (`/movie/${filmId}?api_key=${API_KEY}`)

    return response.data;
}
export const fetchFilmCast = async (filmId) => {
    const response = await axios.get
        (`/movie/${filmId}/credits?api_key=${API_KEY}`)
  
    return response.data.cast;
}
 
export const fetchFilmReview = async (filmId) => {
    const response = await axios.get
        (`/movie/${filmId}/reviews?api_key=${API_KEY}`)

    return response.data.results;
}

export const fetchFilmQuery = async (filmId) => {
    const response = await axios.get
        (`/search/movie?query=${filmId}&api_key=${API_KEY}`)

    return response.data.results;
}

 
