import React, { useState } from "react";
import Folder from "../Folder/Folder";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { useNavigate } from 'react-router';
import { getFolders, createFolder, getTodos, createTodo, editTodo, deleteTodo } from "../../actions";
import styles from './Home.module.css';
import { MdModeEditOutline, MdDelete } from 'react-icons/md';
import { AiFillFolderAdd } from 'react-icons/ai';

function validate(name) {
    let error = '';
    if (name.length > 100) return error = 'Folder´s name can´t be longger than 100 characters.';
    return error;
}

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getFolders());
    }, [dispatch]);

    const allFolders = useSelector((state) => state.folders);

    // Folder Creator: --------------------------------------------------------
    const [showFC, setShowFC] = useState(false)
    const [folderName, setFolderName] = useState('');
    const [error, setError] = useState('');

    function handleFolderInputChange(e) {
        e.preventDefault();
        setFolderName(e.target.value);
        setError(validate(e.target.value));
    }

    function handleCreate(e) {
        e.preventDefault();
        let found = allFolders.find(el => el.name.toLowerCase() === folderName.toLocaleLowerCase());
        if (error === '' && folderName !== '' && !found) {
            dispatch(createFolder({ name: folderName }));
            setFolderName('');
            setShowFC(false);
            alert(`Folder ${`"${folderName}"`} creted successfully`);
            navigate(0);
        }
        else if (found) alert(`There already exists a folder with "${folderName}" as a name.`);
        else if (folderName === '') alert('Folders must have a name.');
        else alert('Sory, folder can´t be created with this data.');
    }
    // ------------------------------------------------------------------------

    // To-do item creator: -------------------------------------------------------
    const [showTC, setShowTC] = useState(false);
    const [todoName, setTodoName] = useState('');

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    const allTodos = useSelector((state) => state.todos);

    function handleTodoInputChange(e) {
        setTodoName(e.target.value);
    }

    function handleCreateTodo(e) {
        e.preventDefault();
        let found = allTodos.find(el => el.name.toLowerCase() === todoName.toLowerCase());
        if (!found && todoName.length > 0) {
            dispatch(createTodo({ name: todoName }));
            setTodoName('');
            setShowTC(false);
            alert(`To-do item "${todoName}" created successfully.`);
            navigate(0);
        }
        else if (todoName.length === 0) alert('To-do items must have a name.');
        else alert(`There already exists a To-do item named "${todoName}"`);
    }

    //------------------------------------------------------------------------------

    const todosAlone = allTodos.filter(el => !el.folderId);

    const [addToFolder, setAddToFolder] = useState('');
    const [folderId, setFolderId] = useState('');

    function handleAddToFolderInputChange(e) {
        e.preventDefault();
        setAddToFolder(e.target.value);
        var nameOfFolder = allFolders.find(el => el.name === addToFolder);
        if (nameOfFolder) {
            setFolderId(nameOfFolder.id);
            console.log(nameOfFolder.id);
        } else console.log(nameOfFolder)
    }

    function addTodoToFolder(e) {
        e.preventDefault();
        if (folderId) {
            dispatch(editTodo({ folderId }));
            setAddToFolder('');
            setFolderId('');
            alert(`"${e.target.value}" added to folder "${addToFolder}""`)
        } else alert(`There is no folder named "${addToFolder}".`)
    }

    const [completed, setCompleted] = useState(false);

    function handleCheckbox(e) {
        setCompleted(!completed);
        dispatch(editTodo({
            completed: completed,
            id: e.target.value
        }));
    }

    const [newName, setNewName] = useState('');
    function handleChangeName(e) {
        e.preventDefault();
        setNewName(e.target.value);
    }
    function handleSubmitChangeName(e) {
        e.preventDefault();
        dispatch(editTodo({
            newName,
            id: e.target.id
        }));
        alert(`"${e.target.name}" changed to "${newName}".`);
        navigate(0);
    }

    function handleDeleteTodo(name, id, e){
        e.preventDefault();
        console.log(id == undefined, id);
        dispatch(deleteTodo(id));
        alert(`"${name}" deleted successfully.`);
        // navigate(0);
    }    

    return (
        <div className={styles.home}>
            <h1>Create lists of tasks</h1>
            <button onClick={() => setShowFC(true)} >
                Create new folder
            </button>
            <button onClick={() => setShowTC(true)} >
                Create new To-do item
            </button>
            {
                showFC ?
                    <div>
                        <h1>Create your new To-do folder</h1>
                        <form onSubmit={handleCreate}>
                            <input
                                placeholder='Name . . .'
                                type='text'
                                onChange={handleFolderInputChange}
                                value={folderName}
                            />
                            <button type='submit' >Create</button>
                        </form>
                        <button onClick={() => {
                            setFolderName('')
                            setShowFC(false);
                        }}>Cancel</button>
                    </div> :
                    null
            }
            {
                showTC ?
                    <div>
                        <h1>Create a new To-do item</h1>
                        <form onSubmit={handleCreateTodo}>
                            <input onChange={(e) => handleTodoInputChange(e)} placeholder='Name . . .' />
                            <button>Create</button>
                        </form>
                        <button onClick={() => {
                            setTodoName('');
                            setShowTC(false);
                        }} >Cancel</button>
                    </div> :
                    null
            }
            <div className={styles.todosAloneCont}>
                {
                    todosAlone && todosAlone.length > 0 && todosAlone.map((el, i) => {
                        const id = el.id;
                        const name = el.name;
                        return (
                            <div key={i} className={styles.todo}>
                                <h4>{name}</h4>
                                <input type='checkbox' onChange={handleCheckbox} value={id} name={name} />
                                {/* <div>
                                    <form onSubmit={addTodoToFolder} value={el.name}>
                                        <input
                                            type='text'
                                            placeholder='Add To-do item to folder . . .'
                                            value={addToFolder}
                                            onChange={handleAddToFolderInputChange}
                                        />
                                        <button><AiFillFolderAdd /></button>
                                    </form>
                                </div> */}
                                <form onSubmit={handleSubmitChangeName} id={id} name={name}  >
                                    <input type='text' onChange={(e) => handleChangeName(e)} placeholder={`Edit ${name}...`} value={newName} />
                                    <button type='submit'><MdModeEditOutline /></button>
                                </form>
                                <button onClick={(e) => handleDeleteTodo(name, id, e)} ><MdDelete/></button>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.foldersCont}>
                {
                    allFolders && allFolders.length > 0 && allFolders.map((el, i) => {
                        return (
                            <div key={i}>
                                <Folder
                                    name={el.name}
                                    id={el.id}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}