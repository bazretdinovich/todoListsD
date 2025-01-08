//-------------------------------------------------------------------


import {IconButton, TextField} from "@material-ui/core";
import React, {ChangeEvent, useState} from "react";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>
    ) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        setError(null)
        if (e.key === "Enter" && e.ctrlKey) {
            props.addItem(title.trim())
            setTitle("")
        }
    }

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    return <div>
        {/*<input className={error ? "error" : ""}*/}
        {/*       value={title}*/}
        {/*       onChange={onNewTitleChangeHandler}*/}
        {/*       onKeyDown={onKeyPressHandler}*/}
        {/*/>*/}
        <TextField
            variant={"outlined"}
            size={"small"}
            label={"Type value"}
            error={!!error}
            helperText={error}
            value={title}
            onChange={onNewTitleChangeHandler}
            onKeyDown={onKeyPressHandler}
        />
        <IconButton onClick={addTask} color={"primary"} size={"medium"}>
            <ControlPoint/>
        </IconButton>
        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
}