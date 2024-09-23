import { BoardAction, BoardState } from "./BoardContext"

import {
    ADD_LIST,
    ADD_CARD,
    DELETE_LIST,
    DELETE_CARD,
    EDIT_LIST,
    EDIT_CARD,
    MOVE_CARD,
    MOVE_LIST
} from '../shared/actionTypes'

export const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
    switch (action.type) {
        case ADD_LIST:
            return {
                lists: [...state.lists, { id: action.payload.id, title: action.payload.title, cards: [] }],
            }

        case ADD_CARD:
            return {
                lists: state.lists.map(list => list.id === action.payload.listId
                    ? { ...list, cards: [...list.cards, { id: action.payload.cardId, content: action.payload.content }] }
                    : list)
            }

        case DELETE_LIST: {
            return { lists: state.lists.filter(list => list.id !== action.payload) }
        }

        case DELETE_CARD: {
            return {
                lists: state.lists.map(list => list.id === action.payload.listId
                    ? { ...list, cards: list.cards.filter(card => card.id !== action.payload.cardId) }
                    : list
                )
            }
        }

        case EDIT_LIST: {
            return{
                lists: state.lists.map(list => list.id === action.payload.id
                    ? {...list, title:action.payload.title}
                    : list
                )
            }
        }

        case EDIT_CARD: {
            return {
                lists: state.lists.map(list => list.id === action.payload.listId
                    ? {
                        ...list,
                        cards: list.cards.map(card => card.id === action.payload.cardId
                            ? { ...card, content: action.payload.content }
                            : card
                        )
                    }
                    : list
                )
            };
        }

        case MOVE_CARD: {
            const { fromListId, toListId, cardId, newCardIndex } = action.payload;

            const fromList = state.lists.find(list => list.id === fromListId);
            const toList = state.lists.find(list => list.id === toListId);
            if (!fromList || !toList) return state;

            const draggedCard = fromList.cards.find(card => card.id === cardId);
            if (!draggedCard) return state;
            fromList.cards = fromList.cards.filter(card => card.id !== cardId);
            toList.cards.splice(fromListId !== toListId ? newCardIndex + 1 : newCardIndex, 0, draggedCard);
            return {
                ...state,
                lists: state.lists.map(list => {
                    if (list.id === fromListId) return { ...fromList };
                    if (list.id === toListId) return { ...toList };
                    return list;
                }),
            };
        }

        case MOVE_LIST: {
            const { listId, toIndex } = action.payload;
            const draggedList = state.lists.find(list => list.id === listId);
            if (!draggedList) return state;
            const updatedLists = state.lists.filter(list => list.id !== listId);
            updatedLists.splice(toIndex, 0, draggedList);

            return { ...state, lists: updatedLists };
        }

        case 'TOGGLE_STATUS': {
            return {...state, isDragOver: !state.isDragOver}
        }

        default:
            return state;
    }
}