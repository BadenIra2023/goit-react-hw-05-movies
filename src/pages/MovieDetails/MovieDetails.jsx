import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef, lazy, Suspense } from "react";
import { fetchFilmDetails } from "../../components/api";
import Notiflix from 'notiflix'; 
import { Loader } from "../../components/Loader/Loader";
import css from "./MovieDetails.module.css";
import { Link, Routes, Route } from "react-router-dom";


const Cast = lazy(() => import("../../components/Cast/Cast"));
const Reviews = lazy(() => import("../../components/Reviews/Reviews")); 

export const MovieDetails = () => {
  const params = useParams()
/*  const [getFilm, setGetFilm] = useState() */
  const [poster, setPoster] = useState("")
  const [title, setTitle] = useState("")
  const [overview, setOverview] = useState("")
  const [genres, setGenres] = useState([])
  const [release, setRelease] = useState("")
  const [average, setAverage] = useState(0)
  const [isLoading, setIsLoading] = useState(false);
/*  const [filmId, setFilmId]= useState("") */
  const location = useLocation();
  
  const backLinkHome = useRef(location.state?.from ?? '/');
  
  const [error, setError] = useState(null);
 
     useEffect(() => {
    const getFilmDetails = async () => {
     if (params === "") { return }
     setIsLoading(true);
    try {
      const response = await fetchFilmDetails(params.imageId)
   /*   setGetFilm(response) */
    /*   setFilmId(params.imageId) */
      console.log(response)
      setPoster(response.poster_path)
      setTitle(response.original_title)
      setOverview(response.overview)
      setGenres(response.genres)
      setRelease(response.release_date)
      setAverage(response.vote_average)
        
 }
    catch (error) {
      Notiflix.Notify.failure("Something went wrong. Please try again.");
       setError(error)
        console.log(error)
    }
    finally {
    setIsLoading(false);
    };
    }  
    getFilmDetails();
     }, [params]);
  
  
  return (
    <div>
        <div className={css.poster}> 
           
        <div >
            <Link className={css.buton} to={backLinkHome.current}>Go back</Link>
            {error !== null && (
        <p className={css.cerror}>
          Oops, some error occured. Please, try again later. Error: {error}
        </p>
            )} 
            {isLoading && <Loader />}
        <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title}
              width={300}
              loading="lazy" /></div>
        <div>
        <h2>{`${title}  (${release.split('-')[0]})`}</h2>
        <p>User Score: {(average.toFixed(1))*10}  %</p>
        <h3>Overview</h3>
          <p>{overview}</p>
        <h3>Genres</h3>
            <p>  {genres?.length>0 && genres.map(({ id, name }) => <span key={id}>  {name},</span>)}</p>
          </div>
          
      </div>
      <h2>Additional information</h2>
      <ul >
       <li><Link to="cast"> Cast </Link> </li>
       <li><Link to="reviews">   Reviews</Link> </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
       <Routes>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Routes>
      </Suspense>
      </div>
    )
} 
export default  MovieDetails