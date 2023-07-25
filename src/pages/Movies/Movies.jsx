
import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { fetchFilmQuery } from "../../components/api"
import { Loader } from "../../components/Loader/Loader";

export const Movies = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [getquerys, setGetQuerys] = useState([]);
  const location = useLocation();  
  console.log(searchTerm)

  useEffect(() => {
   if (!searchTerm) {return}
    const SearchForm = async () => {
      try {
      setIsLoading(true);
      const response = await fetchFilmQuery(searchTerm)
      setGetQuerys(response)
      
      console.log(response) 
      console.log(getquerys)
      }
    catch (error) {
    setError(error.message);
    /*  Notiflix.Notify.failure(`Something went wrong. Please try again.${error}`); */
      console.log(error)
      }
       finally {
        setIsLoading(false);
      }
    }  
    SearchForm();
  }, [searchTerm]);



    const handleSubmit = event => {
        event.preventDefault();
        const searchValue = event.target.children.search.value.trim();
        console.log(searchValue)
        setSearchParams({ query: searchValue,})
    }


return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text"
                name="search"
                placeholder="Please enter a keyword"
                required
                minLength={2}/>
            <button type="submit" >Search</button>
    </form>
     {error !== null && (
        <p className="c-error">
          Oops, some error occured. Please, try again later. Error: {error}
        </p>
    )}
    {isLoading && <Loader />}
    {getquerys.length > 0 && (
        <ul>
          {getquerys.map(getquery => (
            <li key={getquery.id}>
              <Link
                state={{ from: location }}
                to={`/movies/${getquery.id}`}
              >
                {getquery.title}
              </Link>
            </li>
          ))}
        </ul>
      )}



  </div>
    )
   }

export default Movies