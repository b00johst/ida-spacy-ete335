import React from 'react'

import ShortAnswer from './short-answer'

export const ExactMatch = (props) => {
    const {correct} = props;
    
    const validation = (answer) => {
        return answer === correct;
    };

    return (<ShortAnswer {...props} validation={validation} />)
}


export const NumericMatch = (props) => {
    const correct = parseFloat(props.correct);
    
    const validation = (answer) => {
        if(isNaN(answer)) { return false; }
        return parseFloat(answer) === correct;
    };

    return (<ShortAnswer {...props} validation={validation}/>)
}



export const RangeMatch = (props) => {
    const from = parseFloat(props.from)
    const to   = parseFloat(props.to)
    
    const validation = (answer) => {
      if(isNaN(answer)) { return false; }
      const num = parseFloat(answer)
      return num > from && num < to
    };

    return (<ShortAnswer {...props} validation={validation}/>)
}



export const RexegMatch = (props) => {
    
    const validation = (answer) => (new RegExp(props.regex, 'y')).exec(answer) !== null

    return (<ShortAnswer {...props} validation={validation}/>)
}


