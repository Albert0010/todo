import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit";
import {validation} from "../../validation";

export type TtodoType = {
    id:string;
    title:string;
    isChecked:boolean;
    isHidden:boolean;
}

const localStorageResponse = localStorage.getItem('todos');
let todos = localStorageResponse && JSON.parse(localStorageResponse);




const initialState:TtodoType[] = typeof localStorageResponse === 'object' ? [] : todos;

console.log(initialState,'slice');




const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        add:(state, action:PayloadAction<TtodoType>)=>{
            if(validation(action.payload.title)){
                state[state.length] = action.payload;
            }
        },
        _delete:(state, action:PayloadAction<{id:string}>)=>{
            const {id} = action.payload;
            return state.filter(t=>t.id !== id);
        },
        check:(state,action:PayloadAction<{id:string,isHiddenClick:boolean}>)=>{
            const {id,isHiddenClick} = action.payload;
            const index = state.findIndex(t=>t.id === id);
            state[index].isChecked = !state[index].isChecked;
            state.forEach((t)=>{
                if(isHiddenClick && t.isChecked){
                    t.isHidden = true;
                }
            })
        },
        hide:(state)=>{
            state.forEach((t)=>{
                if(t.isChecked){
                    t.isHidden = true
                }
            })
        },
        show:(state)=>{
            state.forEach((t)=>{
                if(t.isHidden){
                    t.isHidden = false
                }
            })
        }
    }
})

export const {_delete,add,check,hide,show} = todoSlice.actions;


export default todoSlice.reducer;