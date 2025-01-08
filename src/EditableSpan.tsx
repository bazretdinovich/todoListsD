import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = useState(false)

    const [title, setTitle] = useState('')

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
         props.onChange(title)

    }

    return editMode
        ? <TextField value={title} onBlur={activateViewMode} autoFocus onChange={onChangeTitleHandler}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}