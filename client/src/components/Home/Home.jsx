import React from "react";
import Folder from "../Folder/Folder";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getFolders } from "../../actions";

export default function Home(){
    const dispatch = useDispatch();
    const allFolders = useSelector((state) => state.folders);

    useEffect(() => {
        dispatch(getFolders());
    });

    return (
        <div>
            Home
            {
                allFolders && allFolders.length > 0 && allFolders.map((el, i) => {
                    return (
                        <div key={i}>
                            <Folder/> {i}
                        </div>
                    )
                })
            }
        </div>
    )
}