import React from "react";
import Folder from "../Folder/Folder";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getFolders } from "../../actions";

export default function Home(){
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getFolders());
    }, [dispatch]);

    const allFolders = useSelector((state) => state.folders);
    console.log('allFolders', allFolders);
    
    return (
        <div>
            Home
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
    )
}