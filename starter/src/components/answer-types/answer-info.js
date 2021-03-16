import React from 'react'
import classNames from 'classnames'
import classes from '../../styles/multi-choice.module.sass'

const AnswerInfo = ({isCorrect, isPartial = () => false, right = null, wrong = null, partial = null, children = []}) => { 

    const infoTheme = () => {
        if(isCorrect()) {
            return classes.correct
        } else if(isPartial()) {
            return classes.partial
        } else {
            return classes.wrong
        }
    }

    const defaultText = () => {
        return isCorrect() ? "Correct! " : isPartial() ? "Your answer is partially correct " : "Incorrect. "
    }

    const userText = () => {      
        return isCorrect() ? right : isPartial() ? partial : wrong
    }

    return (
        <div
                        
        className={classNames(classes.answer, { [infoTheme()]: true })}
        >
        <strong
            className={classNames(classes.answerLabel, {
                [classes.answerLabelCorrect]: isCorrect(),
            })}
        >
            {defaultText()}
        </strong><br></br>
        {
            userText()
        }
        {children}
         </div>
    )
}

export default AnswerInfo