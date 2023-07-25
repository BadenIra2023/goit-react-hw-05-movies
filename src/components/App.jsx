import { Routes, Route, NavLink } from "react-router-dom";
/*import { Home} from '../pages/Home/Home'*/
/*import { Movies } from '../pages/Movies/Movies' */
/*import {MovieDetails} from "../pages/MovieDetails/MovieDetails" */
import css from "./App.module.css"
import { Suspense, lazy } from 'react';


const Home = lazy(()=>import("../pages/Home/Home"));
const MovieDetails = lazy(()=>import("../pages/MovieDetails/MovieDetails"));
const Movies = lazy(()=>import("../pages/Movies/Movies"));

export const App = () => {

  return (
    <div>
      <header className={css.container}>
        <nav className={css.navLink}>
          <NavLink style={{
            textDecoration: "none",
             padding: "8px 16px",
          }} to={"/"}>Home</NavLink>
          <NavLink style={{
            textDecoration: "none",
             padding: "8px 16px",
          }} to={"/movies"}>Movies</NavLink>
        </nav>
      </header>
      <main>
        <Suspense>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="movies/:imageId/*" element={<MovieDetails />}/>
           <Route path="movies" element={<Movies />} />
         </Routes>
        </Suspense>
      </main>
    </div>
  );
  };
