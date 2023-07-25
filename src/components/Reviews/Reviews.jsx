import React, { useEffect, useState } from "react";
import { fetchFilmReview } from "../api";
import { Loader } from "components/Loader/Loader";
import css from "../Reviews/Reviews.module.css"

export const Reviews = (idkey) => {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
     try {
        setIsLoading(true);
    const reviewsData = await fetchFilmReview(idkey.filmId);
    setReviews(reviewsData);
      }
   catch (error) {
       setError(error);
       console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idkey]);

  if (reviews && reviews.length > 0) {
    return (
      <div>
         {isLoading && <Loader />}
        <ul className={css.reviews}>
        {reviews.map(review => {
          const { author, content, id } = review;
          return (
            <li key={id}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          );
        })}
        </ul>
      </div>
    );
  }
  else { return <div>Oops, some error occured. Please, try again later. Error: {error}</div>   }
};

export default Reviews;