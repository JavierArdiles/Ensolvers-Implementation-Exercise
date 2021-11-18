import {
    GET_FOLDERS,
    GET_TODOS_OF_FOLDER
} from '../actions';

const initialState = {
    folders: [],
    todosByFolder: {},
}

function rootReducer(state = initialState, action){
    switch(action.type){

        case GET_FOLDERS:
            return {
                ...state,
                folders: action.payload
            }
        
        case GET_TODOS_OF_FOLDER:
            let folder = state.folders.find(el => el.id === action.payload[1]);
            let folderName = folder.name;
            return {
                ...state,
                todosByFolder: {
                    [folderName]: action.payload[0]
                }
            }
            
        default: return state;
    }
}

export default rootReducer;