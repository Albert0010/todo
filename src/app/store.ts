import { configureStore } from '@reduxjs/toolkit';
import todoSliceReducer from '../features/todoSlice';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";


export const store = configureStore({
  reducer:{
      todoSlice:todoSliceReducer
  }
})

export type TDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch:()=>TDispatch = useDispatch;




