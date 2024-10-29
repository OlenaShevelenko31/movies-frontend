import './hero.css';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const Hero = ({ movies = [] }) => { // Default to an empty array

  const navigate = useNavigate();

  function reviews(movieId)
  {
      navigate(`/Reviews/${movieId}`);
  }

  return (
    <div className='movie-carousel-container'>
      <Carousel>
        {movies.length > 0 ? ( // Check if movies is not empty
          movies.map((movie, index) => ( // Add key for each item
            <Paper key={index}>
              <div className='movie-card-container'>
                <div className='movie-card' style={{"--img": `url(${movie.backdrops[0]})`}}>
                  <div className='movie-detail'>
                    <div className='movie-poster'>
                      <img src={movie.poster} alt={movie.title || "Movie poster"} />
                    </div>
                    <div className='movie-title'>
                      <h4>{movie.title}</h4>
                    </div>
                      <div className="movie-buttons-container">
                          <Link to={`/Trailer/${movie.trailerLink.substring(movie.trailerLink.length - 11)}`}>
                            <div className="play-button-icon-container">
                              <FontAwesomeIcon className="play-button-icon"
                                icon = {faCirclePlay}
                              />
                            </div>
                          </Link>

                          <div className="movie-review-button-container">
                          <Button variant ="info" onClick={() => reviews(movie.imdbId)} >Reviews</Button>
                          </div>
                        </div>
                  </div>
                </div>
              </div>
            </Paper>
          ))
        ) : (
          <p>No movies available</p> // Fallback message if no movies
        )}
      </Carousel>
    </div>
  );
};

export default Hero;
