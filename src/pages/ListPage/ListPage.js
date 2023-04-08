import React from 'react';
import './ListPage.css';
import { useEffect } from 'react';
import { useState } from 'react';
import {useParams} from "react-router-dom"



export default function ListPage() {
    
    
    const [movies, setMovies] =useState([])
    const [loading, isLoading]  = useState(false)
    const params = useParams()

// Load data from favorites 
useEffect(() => { 
    isLoading(true)
    fetch(`https://acb-api.algoritmika.org/api/movies/list/${params.id}`)
    
    .then(response => response.json())
    .then(data => {
        isLoading(false)
        setMovies(data.movies.payload)
    
    })
    

 
 }, [])

        return (
            <div className="list-page" >
                
                <h1 className="list-page__title">Мой список</h1>
                {!loading && <ul>
                    {movies.map((item) => {
                        return (
                            <li className = "results" key={item.id}>  
                             <a href = {`https://www.imdb.com/title/${item.id}/`} target="_blank" rel="noreferrer">{item.title} ({item.year})</a>
                            </li>
                     
                    )})}
                </ul>}
                {loading && <span>Loading...</span>}

         </div>
        );
}


