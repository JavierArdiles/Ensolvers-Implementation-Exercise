import React from "react";
import { MdModeEditOutline, MdDelete } from 'react-icons/md';

export default function Todo({name}){
    return(
        <div>
            <p>{name}</p>
            <input
                type='checkbox'
            />
            {/* <button><MdModeEditOutline/></button> */}
            {/* <button><MdDelete/></button> */}
        </div>
    )
}