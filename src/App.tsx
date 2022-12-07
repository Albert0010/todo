import React, {FC, useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./app/store";
import Todo from "./components/Todo";
import {add, hide, show, TtodoType} from "./features/todoSlice";
import uuid from 'react-uuid';
import {validation} from "./validation";


const App: FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const [isFocus, setFocus] = useState<boolean>(false);
    const state = useAppSelector(state => state.todoSlice);

    let todos: TtodoType[] = state;
    const condition1 = localStorage.getItem('isHiddenClick') === 'true';
    const condition2 = localStorage.getItem('isHiddenClick') === 'false';

    const localIsHiddenClick = condition1 || condition2 || false;

    const [isHiddenClick, setHiddenClick] = useState(localIsHiddenClick);
    const dispatch = useAppDispatch();
    const [isValid, setIsValid] = useState<boolean>(true);

    useEffect(() => {
        const localStorageResponse = localStorage.getItem('todos');
        todos = localStorageResponse ? JSON.parse(localStorageResponse) : state;
        localStorage.setItem('todos', JSON.stringify(state));
    }, [state]);



    document.addEventListener("click",()=>{
        if(isFocus){
            setFocus(false)
        }
        document.removeEventListener('click',()=>{
            if(isFocus){setFocus(false)}
        });
    })

    useEffect(() => {
        localStorage.setItem("isHiddenClick", `${isHiddenClick}`);
    }, [isHiddenClick]);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {value} = e.target;
        setInputValue(value);
    }
    const handleAddClick = (): void => {
        dispatch(add({title: inputValue, isChecked: false, id: uuid(), isHidden: false}));
        setIsValid(validation(inputValue));
        setInputValue('');
    }
    const clearInput = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.stopPropagation()
        setInputValue('');
    }

    const handleHide = (): void => {
        setHiddenClick(!isHiddenClick);
        if (!isHiddenClick) {
            dispatch(hide());
        } else {
            dispatch(show());
        }
    }

    const onFocus = (): void => {
        setFocus(true);
    }
    const offFocus = (): void => {
        setFocus(false);
    }


    return (
        <div className="App">
            <div className="container">
                <div className="header">
                    <div className="hide_completed">
                        <input
                            type="checkbox"
                            onChange={handleHide}
                            id={"hide_completed"}
                            checked={isHiddenClick}
                        />
                        <label htmlFor={'hide_completed'}>Hide completed</label>
                    </div>
                </div>

                <div className="main">
                    <div className="input_field">
                        <form onClick={(e:React.MouseEvent<HTMLFormElement>)=>{
                            e.stopPropagation()

                        }} onSubmit={(e: React.FormEvent<HTMLFormElement>) => {

                            e.preventDefault()
                            handleAddClick()
                        }}>

                            <input
                                type="text"
                                onFocus={onFocus}
                                // onBlur={(e) => {
                                //     console.log(e.target);
                                //     offFocus()
                                // }}
                                value={inputValue}
                                onChange={handleChange}
                                placeholder="Write here"
                                className={`input ${!isValid && 'isValidInput'}`}
                            />
                        </form>
                        <button
                            className={isFocus ? "clear_input" : 'disabledFocus'}
                            onClick={clearInput}
                        >X
                        </button>
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
                            if (validation(todo.title)) {
                                return <Todo {...todo}
                                             isHiddenClick={isHiddenClick}
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
