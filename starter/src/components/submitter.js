

import React, { useState, useContext, useCallback, useEffect} from 'react'
import { Button } from './button'
import {TaskContext} from '../context/index.js'

const Submitter = () => {

    const taskContext = useContext(TaskContext);
    const handleAnswer = () => {
        console.log("SUBMIT");
    }

    return (
        <>
           <Button variant="primary" onClick={handleAnswer}>
                Submit
            </Button>
        </>
    )

}

export default Submitter;



