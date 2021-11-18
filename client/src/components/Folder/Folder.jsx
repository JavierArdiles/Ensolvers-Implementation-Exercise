import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTododsOfFolder } from "../../actions";

export default function Folder({name, id}){

    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todosByFolder[name]);

    useEffect(() => {
        dispatch(getTododsOfFolder(id));
    }, [dispatch, id]);

    return (
        <div>
            <h1>{name}</h1>
            <ul>
                {
                    todos && todos.length > 0 && todos.map((el, i) => {
                        return (
                            <li key={i}>
                                {el.name}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}