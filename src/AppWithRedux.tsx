import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTotodlistFilterAC,
    changeTotodlistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, chahgeTaskStatusAC, chahgeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootState, Array<TodolistType>>( state => state.todolists )
    const tasks = useSelector<AppRootState, TasksStateType>( state => state.tasks )
    // todolists
    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTotodlistFilterAC(value, todolistId)
        dispatch(action)
    }

    function changeTodolistTitle (newTitle: string, tListId: string) {
        const action = changeTotodlistTitleAC(newTitle, tListId)
        dispatch(action)
     }

    function todolistDelete (todolistId: string) {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
       }

    function addTodolist (title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    // tasks

    function removeTask(idTask: string, idTodoList:string) {
        const action = removeTaskAC(idTask, idTodoList)
        dispatch(action)
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(title, todolistId)
        dispatch(action)
    }

    function changeTaskTitle (newTitle: string, tListId: string, taskId: string) {
        const action = chahgeTaskTitleAC(newTitle, tListId, taskId)
        dispatch(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        const action = chahgeTaskStatusAC(taskId, isDone, todolistId)
        dispatch(action)
    }

    return (
        <div className="App">

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant={"h6"}>
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
                <Container fixed>
                <Grid container style={{ padding: '20px' }}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasks[tl.id];

                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }

                    return <Grid item>
                        <Paper style={ { padding: '10px' }}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        delTodoList={todolistDelete}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                        </Paper>
                    </Grid>
                })
            }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
