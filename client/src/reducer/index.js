import {
    GET_FOLDERS
} from '../actions';

const initialState = {
    folders: [],
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_FOLDERS:
            return {
                ...state,
                folders: action.payload
            }
    }
}

export default rootReducer;