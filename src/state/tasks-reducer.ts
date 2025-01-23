import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTotodlistActionType, RemoveTodoListActionType} from "./todolists-reducer";

// type ActionType = {
//     type: string
//     [key: string]: any
// }

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

type ActionTypes = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTotodlistActionType | RemoveTodoListActionType


export const tasksReducer = (state: TasksStateType, action: ActionTypes): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // const stateCopy = {...state}
            // const tasks = state[action.todolistId]
            // const filteredTasks = tasks.filter(el => el.id !== action.taskId)
            // stateCopy[action.todolistId] = filteredTasks
            // return stateCopy

            return {...state, [action.todolistId]: [...state[action.todolistId].filter(el => el.id !== action.taskId)]}

        }
        case 'ADD-TASK': {
            // const stateCopy = {...state}
            // const tasks = stateCopy[action.todolistId]
            const newTask = {id: '4', title: action.title, isDone: false}
            // const newTasks = [newTask, ...tasks]
            // stateCopy[action.todolistId] = newTasks
            //
            // return stateCopy

            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId]
            const task = tasks.find(f => f.id === action.taskId)
            if(task) {
                task.isDone = action.isDone
            }
            return stateCopy

            //return {...state, [action.todolistId]: [...state[action.todolistId].map(el => el.id === action.taskId ? {...el, isDone: action.isDone} : el)]}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.todolistId]: [...state[action.todolistId].map(el => el.id === action.taskId ? {...el, title: action.title} : el)]}
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {

            const stateCopy = {...state}
            delete stateCopy[action.id]
            return stateCopy
        }
        default:
            throw new Error("I don't understand this type")

    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK',taskId, todolistId }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return { type: 'ADD-TASK', todolistId, title }
}

export const chahgeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', todolistId, taskId, isDone }
}

export const chahgeTaskTitleAC = (title: string, todolistId: string, taskId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', todolistId, taskId, title }
}
