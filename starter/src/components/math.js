import MathJax from 'react-mathjax2'
import React from 'react'


const Math = (props) => { 
    return ( 
        <MathJax.Context input='tex'>
        <div style={ {"paddingBottom": "1rem"}}>
            <MathJax.Node inline>{ props.children }</MathJax.Node>
        </div>
        </MathJax.Context>
    );
};



export default Math 