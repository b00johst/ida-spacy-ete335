import React, { useState, useCallback } from 'react'

import { Button } from '../button'
import classes from '../../styles/multi-choice.module.sass'
import AnswerInfo from './answer-info'
import { Input } from '../input'

function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}

function equal(setA, setB) {
    const diff = difference(setA, setB)
    return diff.size === 0 && setA.size === setB.size
}

const MultiChoice = ({ id = '0', wrong="", partial=wrong, right="" ,children = [] }) => {
    const [selected, setSelected]   = useState(new Set())
    const [answer, setAnswer]       = useState(new Set())
    //const [isCorrect, setIsCorrect] = useState(false)
    const isCorrect = () => {
        return equal(correctSet, answer)//difference(correctSet, answer).size == 0
    };

    const isPartial = () => {
        // Order matters in differnece
        return difference(answer, correctSet).size === 0 && !equal(answer,correctSet)
    }

    
    const emptyLineRegex = /^\s*\n?/gm;
    // kör bara om selected är ändrat när du frågar om körningen, olika körningar kräver att selected är ändrad
    const options        = children.filter(child => child !== '\n' && (child.match? !child.match(emptyLineRegex): true))
    const correctSet     = new Set([...options.map(({ key, props }, i) => ({index: i, correct: props.correct})).filter((item)=>!!item.correct).map((item)=>item.index)])
    
    const handleAnswer = useCallback(() => {
        setAnswer(new Set([...selected])) // måste spridas annars blir det en sidoeffekt när selected ändras vilket beror på att det skickas som reference
    }, [selected]) 


    return (
        <>
            {options.map(({ key, props }, i) => {
               return (<p key={key} className={classes.option}>
                    <Input
                        className={classes.input}
                        name={`choice-${id}`}
                        id={`choice-${id}-${i}`}
                        value={i}
                        type="checkbox"
                        checked={selected.has(i)}
                        onChange={() => {
                            selected.delete(i) ? setSelected(new Set([...selected])) : setSelected(new Set([...selected, i])) 
                        }}
                    />
                    <label
                        className={classes.label}
                        htmlFor={`choice-${id}-${i}`}
                        dangerouslySetInnerHTML={{ __html: `<span>${props.text}</span>` }}
                    />
                </p>)
            })}
            <Button variant="primary" onClick={handleAnswer}>
                Submit
            </Button>
            {
                answer.size > 0 && <AnswerInfo isCorrect={isCorrect} isPartial={isPartial} right={right} wrong={wrong} partial={partial}></AnswerInfo>
            }
      
        </>
    )
}

export const Option = ({ children }) => {
    return children
}

export default MultiChoice

/*
      {options.map(({ key, props }, i) => {
                const isCorrect = !!props.correct
                return answer.has(i) ? (
                    <div
                        key={key}
                        className={classNames(classes.answer, { [classes.correct]: isCorrect })}
                    >
                        <strong
                            className={classNames(classes.answerLabel, {
                                [classes.answerLabelCorrect]: isCorrect,
                            })}
                        >
                            {isCorrect ? "That's correct! " : 'Incorrect. '}
                        </strong>
                        {props.children}
                    </div>
                ) : null
            })}

*/