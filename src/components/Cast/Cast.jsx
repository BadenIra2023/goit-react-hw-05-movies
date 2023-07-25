import React, { useEffect, useState } from 'react';
import { fetchFilmCast } from "../api";
import css from "../Cast/Cast.module.css"
import { Loader } from 'components/Loader/Loader';
import { useParams } from 'react-router-dom';


export const Cast = () => {
 
  const [filmCast, setFilmCast] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { imageId } = useParams();
  console.log(imageId)
  useEffect(() => {
    if (!imageId) return;
    const fetchCastData = async () => {
      
      try {
        setIsLoading(true);
        const filmCastData = await fetchFilmCast(imageId);
        
        setFilmCast(filmCastData);
      } catch (error) {
        setError(error);
        console.log(error)
      } 
      finally {
        setIsLoading(false);
      }
    };
   
    fetchCastData();
  }, [imageId]);
  
if (filmCast.length >0)  { 
  return (
    <div > 
      {error !== null && (
        <p className="c-error">
          Oops, some error occured. Please, try again later. Error: {error}
        </p>
      )}
      {isLoading && <Loader />}

      <ul className={css.cast}>
      {filmCast.map(cast => {
          const { profile_path, name, character, id } = cast;
          return (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                width="100"
                alt={name}
              />
              <p>{name}</p>
              <p>Character: {character}</p>
            </li>
          );
      })}
      </ul>

    </div>
  );}  }

  
export default Cast;
