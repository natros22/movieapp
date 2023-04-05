// import Movies from "../components/Movies/Movies"
// import Favorites from "../components/Favorites/Favorites";


const initialState = { 
    cart: [],
    movies: [],
    fav: []
}


export function reducer(state = initialState, action, listName){
    var cart = [...state.cart]

    console.log(cart)
    console.log(state)

    switch(action.type){
        case 'ADD_TO_FAVORITES':
            const found = cart.find(elem => elem.id === action.payload.imdbID);
            if (found) {
                return state;
            }
            cart.push({title:action.payload.Title, id:action.payload.imdbID});
                return {
                ...state,
                cart:cart,
                movies: cart,
                fav:cart
            }
            
        case 'DELETE_FROM_CART':
            const id = action.payload.imdbID
            var clone = cart.filter(item => item.id !== id)
 
            return{
                ...state,
                cart:clone,     
                movies: cart,
                fav:cart       
            }


        case 'SAVE_CART':

            return {
                ...state,
                cart:cart,
                movies: cart,
                fav:cart,
        
        
            }
        
            case 'DISPLAY_CARD':

            cart = [...state.cart]
                    return{
                        ...state,
                        cart:cart,
                    }               
      

        default:
            return state;
    }
}