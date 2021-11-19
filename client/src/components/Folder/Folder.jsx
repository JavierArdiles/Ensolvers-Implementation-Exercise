import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, createTodo } from "../../actions";
import Todo from "../Todo/Todo";
import { MdModeEditOutline, MdDelete, MdPlaylistAdd } from 'react-icons/md';
import styles from './Folder.module.css';
import { useNavigate } from "react-router";

function validate(name) {
    let error = '';
    if (name > 100) return error = 'To-do items can´t be longger than 100 characters.'
    return error;
}

export default function Folder({ name, id }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let todos = useSelector((state) => state.todos);
    let todosFiltered = todos.filter(el => el.folderId === id);

    const [show, setShow] = useState(false);
    const [todoName, setTodoName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    // To-do creator: -------------------------------------------------------------------------------------------
    function handleChange(e) {
        e.preventDefault();
        setTodoName(e.target.value);
        setError(validate(e.target.value));
    }

    function handleCreateTodo(e) {
        e.preventDefault();
        let found = todosFiltered.find(el => el.name.toLowerCase() === todoName.toLowerCase());
        console.log('error:', error, todoName, found);
        if (error === '' && todoName !== '' && !found) {
            dispatch(createTodo({ name: todoName, folderId: id }));
            setTodoName('');
            setShow(false);
            alert(`To-do item ${`"${todoName}"`} creted successfully.`);
            navigate(0);
        }
        else if (found) alert(`There already exists a To-do item with "${todoName}" as a name in this folder.`);
        else if (todoName === '') alert('To-do items must have a name.');
        else alert('Sory, item can´t be created with this data.');
    }

    //------------------------------------------------------------------------------------------------------------

    return (
        <div className={styles.folder}>
            <div className={styles.title}>
                <h1>{name}</h1>
                <div className={styles.btnsCont}>
                    {/* <button><MdModeEditOutline /></button> */}
                    <button onClick={() => setShow(true)}><MdPlaylistAdd /></button>
                    {/* <button><MdDelete /></button> */}
                </div>
            </div>
            {
                show ?
                    <div>
                        <form onSubmit={handleCreateTodo}>
                            <label>New To-do item :</label>
                            <input type='text' value={todoName} onChange={(e) => handleChange(e)} />
                            <button type='submit'>Create</button>
                            <button onClick={() => setShow(false)} >Cancel</button>
                        </form>
                    </div> :
                    null
            }
            {
                todosFiltered && todosFiltered.length > 0 && todosFiltered.map((el, i) => {
                    return (
                        <div key={i}>
                            <Todo
                                name={el.name}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}