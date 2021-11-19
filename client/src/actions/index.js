import axios from 'axios';

export const GET_FOLDERS = 'GET_FOLDERS';
export const GET_TODOS = 'GET_TODOS';
export const DELETE_TODO = 'DELETE_TODO';

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

export function getTodos(){
    return async function(dispatch){
        try{
            let json = await axios.get('http://localhost:3001/todo', {});
            return dispatch({
                type: GET_TODOS,
                payload: json.data
            })
        }catch(err){
            console.log(err);
        }
    }
}

export function createFolder(payload){
    return async function(dispatch){
        console.log(payload);
        try{
            const response = await axios.post('http://localhost:3001/folder', payload);
            console.log(response);
            return response;
        }catch(err){
            console.log(err);
        }
    }
}

export function createTodo(payload){
    return async function(dispatch){
        try{
            const response = await axios.post('http://localhost:3001/todo', payload);
            return response;
        }catch(err){
            console.log(err);
        }
    }
}

export function editTodo(payload){
    return async function(dispatch){
        try{
            const response = await axios.put('http://localhost:3001/todo', payload);
        }catch(err){
            console.log(err);
        }
    }
}

export function deleteTodo(id){
    return async function(dispatch){
        try{
            axios.delete('http://localhost:3001/todo', {id})
                .then(res => res);
        }catch(err){
            console.log(err);
        }
    }
}