import { Routes, Route, NavLink } from "react-router-dom";
import { Home} from '../pages/Home/Home'
import { Movies } from '../pages/Movies/Movies'
import {MovieDetails} from "../pages/MovieDetails/MovieDetails"
import css from "./App.module.css"

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
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="movies/:imageId/*" element={<MovieDetails />}/>
           <Route path="movies" element={<Movies />} />
         </Routes>

      </main>
    </div>
  );
  };
/*  <Route path="/movies" element={<Movies/>} /> */