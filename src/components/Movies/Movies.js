import React, {useState, useEffect} from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

export default function Movies({searchLine, props}) {
   
   const [movies, setMovies] = useState([])

// get data from IMDB
   const getMovie = async (searchLine) => {
   if(searchLine !== undefined){
   const res = await  fetch(`http://www.omdbapi.com/?s=${searchLine}&apikey=441c6d22`)
   const responceJson =  await res.json()
   if(responceJson.Search){
   setMovies(responceJson.Search)
   
}
}
}
    useEffect(() => {
        getMovie(searchLine)
    },[searchLine])

        return ( 
            <ul className="movies">
                {movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        
                        <MovieItem {...movie} 
                        onClick={(movie)=>props.addFavoriteMovie(movie)}
                        favoriteComponent={MovieItem}/>
                    </li>
                ))}
            </ul>
        );
}