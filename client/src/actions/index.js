import axios from 'axios';

export const GET_FOLDERS = 'GET_FOLDERS';
export const GET_TODOS_OF_FOLDER = 'GET_TODOS_OF_FOLDER';

export function getFolders(){
    return async function(dispatch){
        try{
            let json = await axios.get('http://localhost:3001/folder', {});
            return dispatch({
                type: GET_FOLDERS,
                payload: json.data
            })
        }catch(err){
            console.log(err);
        }
    }
}

export function getTododsOfFolder(folderId){
    return async function(dispatch){
        try{
            let todosJSON = await axios.get('http://localhost:3001/todo', {});
            let todosOfFolder = todosJSON.data.filter(el => el.folderId === folderId);
            return dispatch({
                type: GET_TODOS_OF_FOLDER,
                payload: [todosOfFolder, folderId]
            })
        }catch(err){
            console.log(err);
        }
    }
}