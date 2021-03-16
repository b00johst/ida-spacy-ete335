import React from 'react'
import Question from '../components/question'

//import classnames from 'classnames';
import classes from '../styles/faq.module.sass'


export const Faq = ({title, data}) => {
    return (
        <>
        <div>
            <div className={classes.container}>
                <div className={classes.faqbox}>

                    <h1>{title}</h1>
                    {data.map((item, index) => (
                        <div>
                            <Question question={item.question} answer={item.answer}></Question>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    )
}

export default Faq

