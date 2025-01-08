import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (idTask: string, idTodoList:string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    id: string
    delTodoList: (todolistId: string) => void
    changeTaskTitle: (newTitle: string, tListId: string, taskId: string) => void
    changeTodolistTitle: (newTitle: string, tListId: string) => void
}

export function Todolist(props: PropsType) {

    const onTodoListDeleteHandler = () => props.delTodoList(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                {/*<button onClick={onTodoListDeleteHandler}>x</button>*/}
                <IconButton onClick={onTodoListDeleteHandler} size={"small"}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map((t) => {

                        const onremoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        const onChangeTitleHandler = (newTitle: string) => {
                            props.changeTaskTitle(newTitle, props.id, t.id)
                        }

                        const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, event.currentTarget.checked, props.id)
                        }

                        return (
                            <div key={t.id} className={t.isDone ? "is-done" : ""}>
                                {/*<input*/}<Checkbox
                                    onChange={onChangeStatusHandler}
                                    // type="checkbox"
                                    checked={t.isDone}/>
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler}/>
                                {/*<button onClick={onremoveHandler}>x</button>*/}
                                <IconButton onClick={onremoveHandler} size={"small"}><Delete/></IconButton>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} onClick={onAllClickHandler}>All</Button>
                <Button color={"primary"} variant={props.filter === "active" ? "contained" : "text"} onClick={onActiveClickHandler}>Active</Button>
                <Button color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
}

