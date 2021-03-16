import React, { useState, useCallback, useContext } from 'react'

import { Button } from '../button'
import AnswerInfo from './answer-info'
import {randomId, hasChildren, findChild} from '../../utility/index'
import { useEffect } from 'react'
import {Option} from "./option"
import classes from '../../styles/select-choice.module.sass'


import { TaskContext } from "../../context/index";

const SelectChoice = ({ id = `${randomId()}`,right="", children = [] }) => {
    const [selected, setSelected] = useState(null)
    const [answer, setAnswer] = useState(null)
    const [options, setOptions] = useState([])
    
    useEffect(() => {
        const optionsMARKDOWN = children.filter(child => child !== "\n")
        const filtered = [...optionsMARKDOWN.map(a => (hasChildren(a) ? findChild(a, Option.tag) : null))];
        setOptions([...filtered]); 
    }, [children]);

    const taskContext  = useContext(TaskContext);
    const handleAnswer = useCallback(() => setAnswer(selected), [selected])

    return (
        <>
            <select className={classes.selectChoice} disabled={taskContext.taskCompleted ? 'disabled' : null} onBlur={e => setSelected(parseInt(e.target.value))}>
                <option key={-1}>{"--välj svar--"}</option>
                {options.map(({ key, props }, i) => (         
                    <option key={key} value={i}>{props.text}</option>
                ))}
            </select>

            <Button variant="primary" onClick={handleAnswer}>
                Submit
            </Button>
         
            {options.map(({ key, props }, i) => {
                const isCorrect = !!props.correct

                return answer === i ? (  
                    <div key={i}>
                    {                     
                        <AnswerInfo isCorrect={() => isCorrect} children={props.feedback || ""}></AnswerInfo>
                    }                                   
                    </div>
                ) : null
            })}
        </>
    )
}

export default SelectChoice
