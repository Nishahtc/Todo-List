import {useReducer} from "react";
import { v4 as uuidv4, v4 } from 'uuid';

export const reducer =(state, action)=>{
   switch (action.type) {
    case "ADD_TODO" :
        return [...state, {id : uuidv4(), text : action.payload.text , isComplete:false}];
    
    case "REMOVE" :
       return state.filter((todo) => todo.id !== action.payload.id);
    
    case "TOGGLE":
        return state.map((todo)=> todo.id === action.payload.id ?
         {...todo, isComplete : !todo.isComplete } :todo);
    case "UPDATE" :
       return state.map((item)=> item.id === action.payload.id ?
       {...item, text:action.payload.text} : item)
    default:
        return state

   }
  
}