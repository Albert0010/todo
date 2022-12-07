import React, {FC, useState} from 'react';
import {_delete, check, TtodoType} from "../features/todoSlice";
import "./todo.css"
import {useAppDispatch} from "../app/store";


const Todo: FC<TtodoType> = ({id, isChecked, title}) => {
    const [isDelete, setDeleteClick] = useState<boolean>(false);


    const dispatch = useAppDispatch();
    const handleDelete = (): void => {
        dispatch(_delete({id}));
        // setDeleteClick(true)
    }
    const handleCheck = (): void => {
        dispatch(check({id}));
    }

    return (
        <>
            <div className="todo">
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
                {/*{isDelete && <div className="background_transparent"></div>*/}
                {/*}*/}
            </div>
            <div>

            </div>
        </>
    );
}

export default Todo;
