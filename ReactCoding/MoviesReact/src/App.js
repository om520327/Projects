import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Header from './components/header/Header';
import Trailler from './components/trailler/Trailler';
import Reviews from './components/reviews/Reviews';
import NotFound from './components/notFound/NotFound';
function App() {
  /* we are using async await
  for asyn thread managment on the client
  this is so the UI is not blocked when long running
  operation like a remote api call are prossesed the
  ui thread will not be block and therfore the user
  screen wil not freeze
   */
  //since we defined baseurl seeting in axios config we dont need to add it path in api.get

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get('/api/v1/movies');

      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovieData = async movieId => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);

      const singleMovie = response.data;

      setMovie(singleMovie);

      setReviews(singleMovie.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />}></Route>
          <Route path='/Trailer/:ytTrailerId' element={<Trailler />}></Route>
          <Route
            path='/Reviews/:movieId'
            element={
              <Reviews
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
              ></Reviews>
            }
          ></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
