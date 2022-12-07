import {createSlice} from "@reduxjs/toolkit";
import {PayloadAction} from "@reduxjs/toolkit";

export type TtodoType = {
    id:string;
    title:string;
    isChecked:boolean;
    isDeleted:boolean;
}

const localStorageResponse = localStorage.getItem('todos'); //null || state
let todos = localStorageResponse && JSON.parse(localStorageResponse);




const initialState:TtodoType[] = typeof localStorageResponse === 'object' ? [] : todos;





const todoSlice = createSlice({
    name:'todo',
    initialState,
    reducers:{
        add:(state, action:PayloadAction<TtodoType>)=>{
            state[state.length] = action.payload;
            localStorage.setItem("todos",JSON.stringify(state))
        },
        _delete:(state, action:PayloadAction<{id:string}>)=>{
            const {id} = action.payload;
            state  = state.map((t)=>{
                if(t.id === id){
                    t.isDeleted = true;
                }
                return t;
            })
            state = state.filter((t)=>!t.isDeleted);
        },
        check:(state,action:PayloadAction<{id:string}>)=>{
            const {id} = action.payload;
            const index = state.findIndex(t=>t.id === id);
            state[index].isChecked = !state[index].isChecked;
            localStorage.setItem("todos",JSON.stringify(state))

        },
    }
})

export const {_delete,add,check} = todoSlice.actions;


export default todoSlice.reducer;