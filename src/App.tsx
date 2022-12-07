import React, {FC, useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./app/store";
import Todo from "./components/Todo";
import {add, TtodoType} from "./features/todoSlice";
import uuid from 'react-uuid';
import {validation} from "./validation";


const App: FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [isFocus, setFocus] = useState<boolean>(false);
    const state = useAppSelector(state => state.todoSlice);

    let todos:TtodoType[] = [];


    useEffect(() => {
        const localStorageResponse = localStorage.getItem('todos');// null || state


        todos = localStorageResponse ? JSON.parse(localStorageResponse) : state;
        return ()=>{
            localStorage.setItem('todos',JSON.stringify(state));
        }
    }, []);



    const [isHiddenClick, setHiddenClick] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [isValid, setIsValid] = useState<boolean>(true);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = e.target;
        setInputValue(value);
    }
    const handleAddClick = (): void => {
        dispatch(add({title: inputValue, isChecked: false,isDeleted:false, id: uuid()}));
        setIsValid(validation(inputValue));
        setInputValue('');
    }

    const handleHide = (): void => {
        setHiddenClick(!isHiddenClick);
    }
    const onFocus = (): void => {
        setFocus(true);
    }
    const offFocus = (): void => {
        setFocus(false);
    }
    console.log(state);


    return (
        <div className="App">
            <div className="container">
                <div className="header">
                    <div className="hide_completed">
                        <input
                            id={"hide_completed"}
                            type="checkbox"
                            checked={isHiddenClick}
                            onChange={handleHide}
                        />
                        <label htmlFor={'hide_completed'}>Hide completed</label>

                    </div>
                </div>

                <div className="main">
                    <div className="input_field">
                        <input
                            className={`input ${!isValid && 'isValidInput'}`}
                            type="text"
                            onFocus={onFocus}
                            onBlur={offFocus}
                            value={inputValue}
                            onChange={handleChange}
                            placeholder="Write here"
                        />
                        <button className={isFocus ? "clear_input" : 'disabledFocus'}>X</button>
                    </div>
                    {!isValid && <p className="error_message">Task content can contain max 54 characters</p>}

                    <div className="button_add">
                        <div>
                            <button onClick={handleAddClick}>Add</button>
                        </div>
                    </div>
                </div>
                <div className="todo_field">
                    {todos?.map((todo: TtodoType) => {
                            if (!(todo.isChecked && isHiddenClick) && validation(todo.title)) {
                                return <Todo {...todo}
                                             key={todo.id}
                                />
                            }
                        }
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
