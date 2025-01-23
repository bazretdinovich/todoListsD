import {v1} from "uuid";
import {TodolistType} from "../App";
import {
    addTodolistAC, changeTotodlistFilterAC,
    ChangeTotodlistFilterActionType,
    changeTotodlistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

//export const qwe = 5;

test('correct todolist should be removed', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let todolistId1 = v1()
    let todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const newTodolistTitle = 'New Todolist'

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe('all')
});

test('correct todolist should change its name', () => {

    const newTodoListTitle = "New-Todolist";

    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = changeTotodlistTitleAC(newTodoListTitle, todolistId2)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe(newTodoListTitle);
    expect(endState[1].id).toBe(todolistId2)
    expect(endState[1].filter).toBe('all')
});

test('correct todolist should change its filter', () => {

    const newTodoListFilter = "completed";

    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action = changeTotodlistFilterAC(newTodoListFilter, todolistId2)

    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2);
    expect(endState[1].filter).toBe(newTodoListFilter);
    expect(endState[1].id).toBe(todolistId2)
    expect(endState[1].title).toBe('What to buy')
});
