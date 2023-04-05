import React, {useState, useEffect} from 'react';
import MovieItem from '../MovieItem/MovieItem';
// import SearchBox from '../SearchBox/SearchBox';
import './Movies.css';
// import Favorites from '../Favorites/Favorites';
// import { state } from '../../store/store';


export default function Movies({searchLine, props}) {
   
   const [movies, setMovies] = useState([])




   const getMovie = async (searchLine) => {
   if(searchLine !== undefined){
   const res = await  fetch(`http://www.omdbapi.com/?s=${searchLine}&apikey=441c6d22`)
   const responceJson =  await res.json()
   console.log(responceJson.Search)
   if(responceJson.Search){
   setMovies(responceJson.Search)
//    console.log(movies)
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