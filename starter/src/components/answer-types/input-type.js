import React from 'react'
import RawInput from './raw-input';



export const RegexInput = (props) => {

    const validation = (answer) => (new RegExp(props.regex, 'y')).exec(answer) !== null

    return (<RawInput {...props} validation={validation}/>)
}
