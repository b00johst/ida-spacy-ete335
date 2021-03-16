
import React from 'react'
import classes from '../styles/burger.module.sass'
import classNames from 'classnames'
import { useCallback } from 'react'
import { useState } from 'react'

const Burger = (props) => {
    const mobileThreshold = 1200;
    const [hidden, setHidden] = useState(true); 
    const [isMobile, setIsMobile] = useState(true)//useState(typeof window !== 'undefined' ? window.innerWidth < mobileThreshold : false);

    const toggleMenu = useCallback(() => {
        if(isMobile) {
            setHidden(!hidden)
        }
    }, [hidden, isMobile]);


    const resetState = useCallback(() => {
        setHidden(true)
        if(window.innerWidth > mobileThreshold) {       
            setIsMobile(false)
        } else {
            setIsMobile(true)
        }   
    }, []);

    if(typeof window !== 'undefined') {
        window.addEventListener('resize', resetState);
    }


    return (
        <nav className={`${props.className} ${classes.wrapperx}`}>
            <div tabIndex={0} role="button" className={classes.toggler} onKeyDown={toggleMenu} onClick={toggleMenu}><div>{hidden ? <p className={classes.burgerClosedIcon}>&#9776;</p> : <p className={classes.ani}>&#x2A2F;</p>}</div></div>  
            <div className={classNames(classes.mobileContainer, { [classes.hiding]: hidden })}>
                {React.cloneElement(props.children, { className: classes.mobileContent })}
            </div>
            <div className={classNames(classes.wideContainer, { [classes.hiding]: hidden })}>
                {React.cloneElement(props.children, { className: props.className })}
            </div>
        </nav>
    );
}

export default Burger; 