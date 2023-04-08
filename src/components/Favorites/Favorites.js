import React, {useState} from 'react';
import { useEffect } from 'react';
import './Favorites.css';
import { state } from '../../store/store'
import {Link} from "react-router-dom"

export default function Favorites () {
    const [ newMovie, setNewMovie] = useState([])
    const [listName, setListName] = useState("")
    const [newList, setNewList]= useState('')
    const [btnState, setBtnState] = useState(true)
    const [btnText, setBtnText] = useState("Сохранить список", false)
    const [isDisabled, setIsDisabled] =useState(false)
    const [linkState, setLinkState] = useState("none")
    const [btnColor, setBtnColor] = useState("#d3d3d3")
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        state.subscribe(()=>{
        const fav = state.getState().cart;
        setNewMovie(fav);
        })

    })
    
    const ButtonChange = ((e) => {
        setListName(e.target.value) 
        setBtnColor("#496ddb")

    })
    
// delete movies from favorites 
    const deleteOnClick = ((imdbID) => {
        state.dispatch({
            type: "DELETE_FROM_CART",
            payload: { imdbID }
        })
   })

// save movies in favorites
   const saveOnClick = (() => {
       if( btnText === "Перейти к списку"){
                setBtnState(Link)   

                fetch(`https://acb-api.algoritmika.org/api/movies/list/${newList}`)
                .then(response => response.json())
                .then(data => {console.log(data.id) 
                })
                window.location.href=(`/list/${newList}`)
        }
        
        if(listName !== "") {   
        setBtnColor("#496ddb")
        setIsDisabled(true)
        
        // sent request
        const savedList = {
            "title": {listName},
            "movies":  state.dispatch({
                type: "SAVE_CART",
                payload: [...newMovie]
            })
        }
        setLoading(true)
        setBtnColor("#496ddb")
       fetch('https://acb-api.algoritmika.org/api/movies/list', {
        method: 'POST',
        headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(savedList)
        })
        .then(response => response.json())
        .then(data => {console.log(data)
           setLoading(false)
           setNewList(data.id)})
           setBtnState("none")
           setLinkState("block")
           
    }
   })
   

           return (
            <div className="favorites">
                <input disabled = {isDisabled} placeholder="Новый список" 
                onChange ={ButtonChange }
                
                className="favorites__name" />
                <ul className="favorites__list"  disabled = {isDisabled}>
                    {newMovie.map((item) => {
                        return <li className = "deleteButton" key={item.id}>{item.title} {item.year}
                        <button disabled = {isDisabled} onClick={() => deleteOnClick(item.id)}>x</button>
                        </li>;
                    })}
                    
                </ul>
                {!loading && <button type="button" disabled = {isDisabled}
                className="favorites__save"
                onClick={() => saveOnClick()}
                style = {{display: btnState, backgroundColor : btnColor}}>{btnText}</button>}
                {loading && <button style = {{display: btnState, backgroundColor : btnColor}}>Loading</button>}
                 <a style = {{display: linkState}} href = {`/list/${newList}`}  >Перейти к списку</a>
                
            </div>
        );
    
}
 
