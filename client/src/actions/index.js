import axios from 'axios';

export const GET_FOLDERS = 'GET_FOLDERS';

export function getFolders(){
    return async function(dispatch){
        try{
            let json = axios.get('http://localhost:3001/folder', {});
            return dispatch({
                type: GET_FOLDERS,
                payload: json.data
            })
        }catch(err){
            console.log(err);
        }
    }
}