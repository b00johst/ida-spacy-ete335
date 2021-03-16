import React from 'react'

//import classnames from 'classnames';
import classes from '../styles/teachers.module.sass'
import { teacherData } from '../data/TeacherData'

export const Teachers = () => {

    return (
        <div className={classes.container}>
            <h1>Teachers</h1>
            <div className={classes.teachercards}>
                {teacherData.map((item, index) => (
                    <div className={classes.teacher}>
                        <img src={item.imgpath} alt={item.jobtitle} className={classes.teacherimg}></img>
                        <p>{item.name}, {item.jobtitle}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Teachers

