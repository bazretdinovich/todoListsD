import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

// type ActionType = {
//     type: string
//     [key: string]: any
// }

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTotodlistActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}
export type ChangeTotodlistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTotodlistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionTypes =
    RemoveTodoListActionType
    | AddTotodlistActionType
    | ChangeTotodlistFilterActionType
    | ChangeTotodlistTitleActionType

export const todolistsReducer = (state: TodolistType[], action: ActionTypes): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el =>el.id !== action.id)
        case 'ADD-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return [
                ...state.map(el => el.id === action.id ? {...el, title: action.title} : el)
            ]
        case 'CHANGE-TODOLIST-FILTER':
            const todolistElem = state.find(el => el.id === action.id)
            if (todolistElem) {
                todolistElem.filter = action.filter
            }
            return [...state]
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const addTodolistAC = (todolistTitle: string): AddTotodlistActionType => {
    return { type: 'ADD-TODOLIST', title: todolistTitle, todolistId: v1() }
}

export const changeTotodlistTitleAC = (title: string, id: string): ChangeTotodlistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}

export const changeTotodlistFilterAC = (filter: FilterValuesType, id: string): ChangeTotodlistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}