import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
}

export function Todolist(props: PropsType) {

    // const [title, setTitle] = useState("");
    // const [error, setError] = useState<string | null>(null);

    // const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>
    // ) => {
    //     setTitle(e.currentTarget.value)
    // }

    // const onKeyPressHandler = (e: React.KeyboardEvent<HTMLElement>) => {
    //     setError(null)
    //     if (e.key === "Enter" && e.ctrlKey) {
    //         props.addTask(title.trim(), props.id)
    //         setTitle("")
    //     }
    // }

    // const addTask = () => {
    //     if (title.trim() !== "") {
    //         props.addTask(title.trim(), props.id)
    //         setTitle("")
    //     } else {
    //         setError("Title is required")
    //     }
    // }

    const onTodoListDeleteHandler = () => props.delTodoList(props.id)
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    return (
        <div>
            <h3>{props.title}
                <button onClick={onTodoListDeleteHandler}>x</button>
            </h3>
            {/*<div>*/}
            {/*    <input className ={error ? "error" : ""}*/}
            {/*           value={title}*/}
            {/*           onChange={onNewTitleChangeHandler}*/}
            {/*           onKeyDown={onKeyPressHandler}*/}
            {/*    />*/}
            {/*    <button onClick={addTask}>+</button>*/}
            {/*    {error && <div className="error-message">{error}</div>}*/}
            {/*</div>*/}
            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((t) => {

                        const onremoveHandler = () => {
                            props.removeTask(t.id, props.id)
                        }

                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, event.currentTarget.checked, props.id)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                <input
                                    onChange={onChangeHandler}
                                    type="checkbox"
                                    checked={t.isDone}/>
                                {/*<span>{t.title}</span>*/}
                                <EditableSpan title={t.title}/>
                                <button onClick={onremoveHandler}>x</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

