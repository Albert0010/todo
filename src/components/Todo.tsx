import React, {FC, useState} from 'react';
import {_delete, check} from "../features/todoSlice";
import "./todo.css"
import {useAppDispatch} from "../app/store";

type Tprops = {
    id: string;
    title: string;
    isChecked: boolean;
    isHidden: boolean;
    isHiddenClick: boolean
}

const Todo: FC<Tprops> = ({id, isChecked, title, isHidden, isHiddenClick}) => {
    const [isDelete, setDeleteClick] = useState<boolean>(false);


    const dispatch = useAppDispatch();
    const handleDelete = (): void => {
        console.log('click')
        setDeleteClick(true);
    }

    const handleDeleteYes = ():void=>{
        dispatch(_delete({id}));
    }

    const  handleCancel = ()=>{
        setDeleteClick(false)
    }


    const handleCheck = (): void => {
        dispatch(check({id, isHiddenClick}));
    }

    const handleStop = (e:React.MouseEvent<HTMLDivElement>)=>{
        e.stopPropagation();
    }


    return (
        <>
            <div className={!isHidden ? "todo" : 'hidden'}>
                <div className="left_side">
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheck}
                    />
                    <h5 className={isChecked ? "isChecked" : ''}>{title}</h5>
                </div>
                <div className="right_side">
                    <button onClick={handleDelete}>X</button>
                </div>
                {isDelete && <div onClick={handleCancel} className="pop_up">

                    <div className="popup_container"  >
                        <div className="yes_or_no" onClick={handleStop} >
                            <div>
                                <p>Are you sure you want to delete?</p>
                            </div>
                            <div className="button_container">
                                <div>
                                    <button onClick={handleDeleteYes}>Yes</button>
                                    <button onClick={handleCancel} className="no">No</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>}
            </div>
            <div>

            </div>
        </>
    );
}

export default Todo;
