import React, { useState, useCallback } from 'react'

import { Button } from '../button'
import classes from '../../styles/short-answer.module.sass'
import AnswerInfo from './answer-info'

import {Input } from '../input'

const ShortAnswer = ({validation, right="", wrong="", children = [] }) => {
    const [answer, setAnswer]       = useState('')
    const [inputText, setInputText] = useState('')

   // const options = children.filter(child => child !== '\n')


    // Assume short answer only consists of one input
    // useEffect(() => { // kanske behöver användas längre upp?
    //  setCorrectAnswer(props.correct)
    // });

    const isCorrect = useCallback(() => {
        return validation(answer)
    }, [answer, validation]);

    const handleAnswer = useCallback(() => {
        setAnswer(inputText)
    }, [inputText]) 


    return (
        <>     
            <Input onChange={event => setInputText(event.target.value) } className={classes.answerInput}></Input>
            <Button variant="primary" onClick={handleAnswer}>
                Submit
            </Button>
            {
                answer.length > 0 && <AnswerInfo isCorrect={isCorrect} right={right} wrong={wrong}></AnswerInfo>
            }
           
        </>
    )
}
/*
export const Input = ({ children }) => {
    return children
}
*/

export default ShortAnswer
