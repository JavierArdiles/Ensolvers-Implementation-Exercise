import {
    GET_FOLDERS,
    GET_TODOS,
    DELETE_TODO
} from '../actions';

const initialState = {
    folders: [],
    todos: [],
}

function rootReducer(state = initialState, action){
    switch(action.type){

        case GET_FOLDERS:
            return {
                ...state,
                folders: action.payload
            }
        
        case GET_TODOS:
            return {
                ...state,
                todos: action.payload
            }
            
        default: return state;
    }
}

export default rootReducer;