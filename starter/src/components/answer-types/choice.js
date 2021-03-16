import React, { useState, useCallback } from 'react'

import { Button } from '../button'
import classes from '../../styles/choice.module.sass'
import AnswerInfo from './answer-info'
import {randomId, hasChildren, findChild} from '../../utility/index'
import { Input } from '../input'
import { useEffect } from 'react'
import { Option } from "./option"

const Choice = ({ id = `${randomId()}`, right="", children = [] }) => {
    const [selected, setSelected] = useState(null)
    const [answer, setAnswer] = useState(null)
    const [options, setOptions] = useState([])

    const handleAnswer = useCallback(() => {setAnswer(selected);}, [selected])

    useEffect(() => {
        const optionsMARKDOWN = children.filter(child => child !== "\n")
        const filtered = [...optionsMARKDOWN.map(a => (hasChildren(a) ? findChild(a, Option.tag) : null))]; //a.type.name == "Option" || a.type.displayName == "Option" ? a : (hasChildren(a) ? optionChild(a) : null))];
        setOptions([...filtered.filter(a => a != null)]);
    }, [children]);


    
    return (
        <>
            {options.map(({ key, props }, i) => (
                <p key={key} className={classes.option}>
                    <Input
                        className={classes.input}
                        name={`choice-${id}-${i}`}
                        id={`choice-${id}-${i}`}
                        value={i}
                        type="radio"
                        checked={selected === i}
                        onChange={() => setSelected(i)}
                        />
                    <label
                        className={classes.label}
                        htmlFor={`choice-${id}-${i}`}
                        dangerouslySetInnerHTML={{ __html: `<span>${props.text}</span>` }} 
                    />
                </p>
            ))}

            <Button variant="primary" onClick={handleAnswer}>
                Submit
            </Button>
         
            {options.map(({ key, props }, i) => {
                const isCorrect = !!props.correct
                return answer === i ? (
                    <div key={key}>
                    {
                        
                         <AnswerInfo isCorrect={() => isCorrect} children={props.feedback || ""}></AnswerInfo>
                    }                                   
                    </div>
                ) : null
            })}
        </>
    )
}

export default Choice
