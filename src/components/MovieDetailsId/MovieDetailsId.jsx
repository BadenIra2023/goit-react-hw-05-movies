//import genres from "./components/genres.js"

export const MovieDetailId = ({data}) => { 

  
    const {
  /*  original_title,
    title,
    genres,
    overview,
    poster_path, */
    release_date,
    vote_average,
    } = data;
    const rating = Math.round(vote_average * 10);
    const release = release_date.slice(0, 4);
    console.log(rating)
    console.log(release)
//function nameGenresId(idNames) {
//const genreNames = idNames.map(idName => {
//    const genre = genres.find(genre => genre.id === idName);
 //   return genre.name;
 // });
 //   return (genreNames.join(', '))
 //   }

    return (
      <h2> hhhhhghgjhjh </h2>
  )  
}  
  export default  MovieDetailId