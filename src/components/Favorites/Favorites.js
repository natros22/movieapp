import React, {useState} from 'react';
import { useEffect } from 'react';
import './Favorites.css';
import { state } from '../../store/store'
// import { useHistory } from 'react-router-dom';
// import { createContext } from 'react';
// import { useParams } from 'react-router';


export default function Favorites (cart) {
    // const history = useHistory();

    
     const [ newMovie, setNewMovie] = useState([])
     const [listName, setListName] = useState([])
    const [newList, setNewList]= useState('')
    
     const [btnText, setBtnText] = useState("Сохранить список", false)
     const [isDisabled, setIsDisabled] =useState(false)
       
    useEffect(()=>{
        state.subscribe(()=>{
        const fav = state.getState().cart;
        setNewMovie(fav);

        })

    })
    
    
    const deleteOnClick = ((imdbID) => {
        state.dispatch({
            type: "DELETE_FROM_CART",
            payload: { imdbID }
        })
   })


   const saveOnClick = ((cart) => {
       if( btnText === "Перейти к списку"){
                   
                     
                fetch(`https://acb-api.algoritmika.org/api/movies/list/${newList}`)
                .then(response => response.json())
                .then(data => {console.log(data.id)
                window.location.href=(`/list/:${data.id}`)
            },[])
            }

        
        setBtnText("Перейти к списку")
        setIsDisabled(true)
       
        const savedList = {
            "title": "listName",
            "movies":  state.dispatch({
                type: "SAVE_CART",
                payload:  cart
            })
        }
       fetch('https://acb-api.algoritmika.org/api/movies/list', {
        method: 'POST',
        headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(savedList)
        })
        .then(response => response.json())
        .then(data => {console.log(data)
           setNewList(data.id)})

        state.dispatch({
            type: "SAVE_CART",
            payload:  cart, state
        })
    })



           return (
            <div className="favorites">
                <input disabled = {isDisabled} placeholder="Новый список" 
                onChange ={(e) =>setListName(e.target.value) }
                className="favorites__name" />
                <ul className="favorites__list"  disabled = {isDisabled}>
                    {newMovie.map((item) => {
                        return <li key={item.id}>{item.title} {item.year}
                        <button  disabled = {isDisabled} onClick={() => deleteOnClick(item.id)}>x</button>
                        </li>;
                    })}
                    
                </ul>
                <button type="button" 
                className="favorites__save"
                onClick={() => saveOnClick()}
                >{btnText}</button>
            </div>
        );
    
}
 
