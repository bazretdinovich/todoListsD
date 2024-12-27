//-------------------------------------------------------------------
import React, {ChangeEvent, useState} from "react";

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
        <input className={error ? "error" : ""}
               value={title}
               onChange={onNewTitleChangeHandler}
               onKeyDown={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>
}