import React, {useState} from 'react';
import './MovieItem.css';
import { state } from '../../store/store';

export default function MovieItem ({ Title, Year, Poster, imdbID, props}){
const [favorites, setFavorites] = useState('')

// add movies to
const addFavoriteMovie = (Title, imdbID, Year) => {
    
    
    state.dispatch({
        type: 'ADD_TO_FAVORITES',
        payload: {Title, imdbID, Year},
        cart: [...favorites]
    })

    }  

        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button type="button"
                    className="movie-item__add-button" 
                    onClick={()=>addFavoriteMovie(Title, imdbID, Year)}
                    >Добавить в список</button>
                    
                </div>
            </article>
        );
    
}
 
