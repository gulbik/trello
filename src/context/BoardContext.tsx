import { createContext, ReactNode, useReducer } from "react";
import { boardReducer } from "./boardReducer";

export interface Card{
    id: string;
    content: string;
}

export interface List {
    id: string;
    title: string;
    cards: Card[];
}

export interface BoardState{
    lists: List[];
    isDragOver?: boolean;
}

export interface BoardAction {
    type: 'ADD_LIST' | 'ADD_CARD' | 'TOGGLE_STATUS'| 'EDIT_LIST' | 'EDIT_CARD' | 'DELETE_LIST' | 'DELETE_CARD' | 'MOVE_CARD' | 'MOVE_LIST' ;
    payload?: any;
}


const initialState: BoardState  = {
    lists: [],
    isDragOver: false}

export const BoardContext = createContext<{state: BoardState, dispatch: React.Dispatch<BoardAction>}> ({
    state: initialState, 
    dispatch: () => null
});


export const BoardProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(boardReducer, initialState);
    return (
        <BoardContext.Provider value={{state, dispatch}}>
            {children}
        </BoardContext.Provider>
    )
}