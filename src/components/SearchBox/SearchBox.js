import React, { useState } from 'react';
import './SearchBox.css';
import Movies from '../Movies/Movies';

export default function SearchBox(props, movies, setMovies) {

    const [searchLine, setSearchLine] = useState()
    
    const searchBoxSubmitHandler = (e) => {
        e.preventDefault();
       let userChoice = document.forms["submitForm"]["name"].value
        setSearchLine(userChoice)
    }

        return (
            <div className="search-box">
                <form className="search-box__form" 
                name='submitForm'
                 onSubmit={searchBoxSubmitHandler}
                
                >
                    <label className="search-box__form-label">
                        Искать фильм по названию:
                        <input
                            value={props.value}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            name="name"
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                    >
                        Искать
                    </button>
                </form>
            <Movies searchLine={searchLine} setSearcLine={setSearchLine}/>
            </div>
        );
}
