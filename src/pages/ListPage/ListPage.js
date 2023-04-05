import React from 'react';
import './ListPage.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { state } from '../../store/store';
// import {useParams} from "react-router"
// import { Reducer } from 'react';
// import Favorites from '../../components/Favorites/Favorites';
// import { applyMiddleware } from 'redux';



export default function ListPage(props, cart, imdbID) {
    const [movies, setMovies] =useState([])

console.log(cart)

    useEffect = (() => {
        state.subscribe(()=>{
            state.dispatch({
                type: "DISPLAY_CART",
                payload:  cart
        })
           
            const mov = state.getState().cart;
            setMovies(mov);
           
} )

        state.dispatch({
        type: "DISPLAY_CART",
        payload:  cart
})
})

        return (
            <div className="list-page" >
                <h1 className="list-page__title">Мой список</h1>
                <ul>
                    {movies.map((item) => {
                        return (
                            <li key={item.imdbID}>

                             <a href="https://www.imdb.com/title/tt0068646/" target="_blank">{item.title} ({item.year})</a>
                            </li>
                     
                    )})}
                </ul>
         </div>
        );
}