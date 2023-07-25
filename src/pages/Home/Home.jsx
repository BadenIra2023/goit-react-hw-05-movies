import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFilms } from "../../components/api";
import Notiflix from 'notiflix'; 
import css from "./Home.module.css"

export const Home = () =>  {

 
const [images, setImages] = useState([]);
const [error, setError] = useState(null);

  
  useEffect(() => {
    const getImages = async () => {
 
    try {
      const response = await fetchFilms()
      const apiImages = response
      setImages(apiImages);
       console.log(apiImages) 
      }
    catch (error) {
      setError(error)
      Notiflix.Notify.failure(`Something went wrong. Please try again.${error}`); 
      console.log(error)
    };
    }  
    getImages();
  }, []);

  return (
    <div> 
      <h1>Trending today</h1>
      <ul>
        {images.map(image => (  
        <li key={image.id} >
          <Link to={`/movies/${image.id}`}>
          <p className={css.filmname}>{image.title}{image.name}</p>
          </Link>  
          </li>   
      ))}
    </ul>
    
    </div>
  );
   };
  
export default  Home