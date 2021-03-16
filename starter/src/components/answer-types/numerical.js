import React, { useState, useCallback, useEffect} from 'react'

import { Button } from '../button'
import classes from '../../styles/multi-choice.module.sass'
import AnswerInfo from './answer-info'


const Numerical = ({right="" ,children = [] }) => {
    const [answer, setAnswer]       = useState('')
    const [inputText, setInputText] = useState('')

    const options = children.filter(child => child !== '\n')

    const [correctAnswer, setCorrectAnswer] = useState(0)
    const [error, setError] = useState(0)

    const props = options[1].props
    // Assume short answer only consists of one input
    useEffect(() => { 
        setCorrectAnswer(parseFloat(props.correct))
        setError(parseFloat(props.error))
    });

    const isCorrect = () => {
      return answer <= correctAnswer + error && answer >= correctAnswer - error
    };

    const handleAnswer = useCallback(() => {
        setAnswer(inputText)
        console.log(answer)
    }, [inputText]) 


    return (
        <>           
            <Input onChange={event => setInputText(event.target.value) } style={{border: "solid"} }></Input>
            <Button variant="primary" onClick={handleAnswer}>
                Submit
            </Button>
            {
                answer.length > 0 && <AnswerInfo isCorrect={isCorrect} right={props.right} wrong={props.wrong}></AnswerInfo>
            }
           
        </>
    )
}

export const Input = ({ children }) => {
    return children
}

export default Numerical
