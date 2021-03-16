import React, { useState, useEffect, useContext} from 'react'
import classes from '../../styles/rawinput.module.sass'
import { MultianswerContext } from "../../context/index";

import {Input} from '../input'


const RawInput = ({validation, id, right="", wrong="", children = [] }) => {
    const [inputText, setInputText] = useState('')
    const multianswerContext = useContext(MultianswerContext);
    const [showValidation, setShowValidation] = useState(multianswerContext.validate);

    useEffect(() => {
        setShowValidation(multianswerContext.validate);    
    }, [multianswerContext.validate]);


    const updateInputText = (value) => {
        setInputText(value)
        setShowValidation(false); 
        multianswerContext.updateAnswer(id, value, validation(value))
    }

    const validationStyle = () => {
        if(showValidation) {
            return validation(inputText) ? classes.correct : classes.incorrect;
        }
        return ''
    }

    return (
        <>        
            <Input value={inputText} 
                   onChange={event => updateInputText(event.target.value) } 
                   className={`${classes.answerInput} ${multianswerContext.validate ?  validationStyle(): ''}`}>        
            </Input>
        </>
    )
}


export default RawInput
