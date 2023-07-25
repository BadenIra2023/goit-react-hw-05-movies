import React, { useEffect, useState } from "react";
import { fetchFilmReview } from "../api";
import css from "../Reviews/Reviews.module.css"

export const Reviews = (idkey) => {
  const [reviews, setReviews] = useState(null);
  console.log(idkey.filmId)
  useEffect(() => {
    const fetchData = async () => {
      const reviewsData = await fetchFilmReview(idkey.filmId);

      setReviews(reviewsData);
      console.log(reviewsData);
    };

    fetchData();
  }, [idkey]);

  if (reviews && reviews.length > 0) {
    return (
      <div>
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
  else { return <div>OOOpsssss</div>   }
};

export default Reviews;