import React from 'react'

//import classnames from 'classnames';
import classes from '../styles/hero.module.sass'


const Hero = () => {
    
    return (
        <>
    
        <div className={classes.container}>
            <div className={classes.background}>
            </div>
            <div className={classes.content}>
                <div className={classes.items}>
                    <h1 className={classes.title}>
                        AI för naturligt språk
                    </h1>
                    <p className={classes.infotext}>
                        Du kommer att lära dig om några aktuella metoder inom naturligt språk-behandling, om vilka resurser som krävs för att bygga språkteknologiska system samt om hur du kan bedöma kvalitén hos dessa metoder och system.
                    </p>
                    <a href="https://www.antagning.se/se/search?period=10&freeText=AI+f%C3%B6r+naturligt+spr%C3%A5k&sortBy=relevance">
                        <button className={classes.button}>
                            Registrera dig här!
                        </button>
                    </a>
                </div>
            </div>
        </div>
      
       
        </>
    )
}

export default Hero

