import React, { useContext } from 'react'
import { TaskContext } from "../context/index";
import classes from '../styles/input.module.sass'


export const Input = (props) => {
    const taskContext = useContext(TaskContext);

    return (
        <>
        <input className={classes} disabled={taskContext.taskCompleted ? 'disabled' : null} {...props} > 
            {props.children}
        </input>

        </>
    )
}
