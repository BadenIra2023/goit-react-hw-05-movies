import React, { useEffect, useState } from 'react';
import { fetchFilmCast } from "../api";
import css from "../Cast/Cast.module.css"


export const Cast = (idkey) => {

  const [filmCast, setFilmCast] = useState({});
  const [error, setError] = useState(null);
  console.log(idkey.filmId)
  useEffect(() => {
    const fetchCastData = async () => {
       console.log(idkey)
      try {
        
        const filmCastData = await fetchFilmCast(idkey.filmId);
        console.log(filmCastData);
        setFilmCast(filmCastData);
      } catch (error) {
        setError(error);
      } 
    };
   
    fetchCastData();
  }, [idkey]);
  
if (filmCast.length >0)  { 
  return (
    <div >
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
