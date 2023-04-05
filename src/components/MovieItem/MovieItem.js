import React, {useState} from 'react';
import './MovieItem.css';
// import Favorites from '../Favorites/Favorites';
// import Movies from '../Movies/Movies';
// import MainPage from '../../pages/MainPage/MainPage';
import { state } from '../../store/store';

export default function MovieItem ({ Title, Year, Poster, imdbID, props}){
const [favorites, setFavorites] = useState('')


const addFavoriteMovie = (Title, imdbID) => {
    
    console.log(Title, imdbID)
    state.dispatch({
        type: 'ADD_TO_FAVORITES',
        payload: {Title, imdbID},
        cart: [...favorites]
    })
    console.log(favorites)
    }  

        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button"
                    className="movie-item__add-button" 
                    onClick={()=>addFavoriteMovie(Title, imdbID)}
                    // handleClick={addFavoriteMovie}
                    >Добавить в список</button>
                    
                </div>
            </article>
        );
    
}
 
