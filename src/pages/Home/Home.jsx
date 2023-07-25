import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchFilms } from "../../components/api";
import Notiflix from 'notiflix'; 
import css from "./Home.module.css"; 
import { Loader } from "components/Loader/Loader";

export const Home = () =>  {

const [isLoading, setIsLoading] = useState(false);
const [images, setImages] = useState([]);
const [error, setError] = useState(null);

  
  useEffect(() => {
    const getImages = async () => {
 
      try {
       setIsLoading(true);
      const response = await fetchFilms()
      const apiImages = response;
      setImages(apiImages);
       console.log(apiImages) 
      }
    catch (error) {
      setError(error);
      Notiflix.Notify.failure(`Something went wrong. Please try again.${error}`); 
      console.log(error)
      }
      finally{ setIsLoading(false);}
    }  
    getImages();
  }, []);

  return (
    <div> 
       {error !== null && (
        <p className="cerror">
          Oops, some error occured. Please, try again later. Error: {error}
        </p>
      )}
     
      <h1>Trending today</h1>
       {isLoading && <Loader />}
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