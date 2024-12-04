import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    let task1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "ReactJS", isDone: true},
    ]

    let task2: Array<TaskType> = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: true},
    ]

    return (
        <div className="App">
            <Todolist title="What to learn" tasks={task1} />
            <Todolist title="Songs" tasks={task2} />
        </div>
    );
}

export default App;
