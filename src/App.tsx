import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "completed" | "active"

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    // let [tasks, setTasks] = useState<Array<TaskType>>([
    //     {id: v1(), title: "HTML&CSS", isDone: true},
    //     {id: v1(), title: "JS", isDone: true},
    //     {id: v1(), title: "ReactJS", isDone: false},
    //     {id: v1(), title: "Redux", isDone: false},
    // ]);

    // let [filter, setFilter] = useState<FilterValuesType>("all")

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(el => el.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    function removeTask(idTask: string, idTodoList:string) {
        let filteredTasks = tasksObj[idTodoList].filter(t => t.id !== idTask)
        tasksObj[idTodoList] = filteredTasks
        setTasksObj({...tasksObj})
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false,
        }

        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks

        // tasksObj[todolistId] = [...tasksObj[todolistId], newTask]

        setTasksObj({...tasksObj})
    }

    function changeTaskTitle (newTitle: string, tListId: string, taskId: string) {
        let task = tasksObj[tListId].find((t) => t.id === taskId)
        if (task) {
            task.title = newTitle
        }

        setTasksObj({...tasksObj})
    }

    function changeTodolistTitle (newTitle: string, tListId: string) {
        let todolist = todolists.find((t) => t.id === tListId)
        if (todolist) {
            todolist.title = newTitle
        }

        setTodolists([...todolists])
    }

    function todolistDelete (todolistId: string) {
        const newTodoList = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodoList)
        delete tasksObj[todolistId]
        setTasksObj({...tasksObj})
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let task = tasksObj[todolistId].find((t) => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }

        setTasksObj({...tasksObj})
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ])

    let [tasksObj, setTasksObj] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Oranges", isDone: false},]
    })

    function addTodolist (title: string) {
        let newTodolist: TodolistType = {id: v1(), title: title, filter: "all"}
        setTodolists([newTodolist, ...todolists])
        setTasksObj({
            ...tasksObj,
            [newTodolist.id]: []
        })
    }

    return (
        <div className="App">

            <AddItemForm addItem={addTodolist}/>

            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }

                    return <Todolist
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
                })
            }

        </div>
    );
}

export default App;
