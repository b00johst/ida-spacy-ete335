import React, { useState } from 'react'
import { Button } from './button'
import { MultianswerContext } from "../context/index";


/*
    A component that handles multiple answer, 
    aggregate them into one context(MultianswerContext) and makes the 
    submission controllable for all fields

*/
const MultiAnswer = ({children}) => {
    const [answer, setAnswer]       = useState({})
    const [validate, setValidate]   = useState(false);

    const updateAnswer = (id, inputText, isCorrect) => {
        let _answer = {...answer};
        _answer[id] = isCorrect // inputText
        setAnswer(_answer);
        setValidate(false);
    }

    const handleAnswer = () => {
        setValidate(true);
        console.log("User answers: ", answer)
    }

    return (
        <>   
            <MultianswerContext.Provider value={{validate, updateAnswer}}>       
                {children}     

            </MultianswerContext.Provider>

            <Button variant="primary" onClick={handleAnswer}>
                Submit
            </Button>
        </>
    )
}


export default MultiAnswer
