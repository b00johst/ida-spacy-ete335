import React, { useRef, useCallback, useContext, useState } from 'react'
import classNames from 'classnames'

import { CompleteButton } from './button'
import { ChapterContext } from '../context'
import IconSlides from '../../static/icon_slides.svg'
import classes from '../styles/exercise.module.sass'
import { useMsal } from '../utility/auth/msalContext';
import { TaskContext as ExerciseContext } from "../context/index"; 
import { useEffect } from 'react'

const TaskExercise = ({ id, title, chapterData, type, children }) => {
    const excRef = useRef()
    const excId = id
    const [completed, setCompleted] = useState(false)

    const { loading, isAuthenticated, login, logout, user, profile, progress, getUserProfileFromGraph,getUserProgressFromApi,  saveCompletedExerciseToApI, removeCompletedExerciseFromApi, getUserLastCompletedFromApi } = useMsal();

    const chapter_id = chapterData.chapter_id
    const taskId = chapterData.id

    const toggleComp = async() => {    

        if(!completed) {
            await saveCompletedExerciseToApI(chapter_id, taskId, id, []);    
        } else {
            await removeCompletedExerciseFromApi(chapter_id, taskId, id, []);   
        }

        setCompleted(!completed)
      }


      useEffect(() => {
            if(!progress) {
                console.log("Failed to retrieve progress")
                return
            }
            
            const chapterFound = progress.chapters.find(element => {console.log(element.moduleId); return element.moduleId === chapter_id;})
            if (chapterFound) {
               
                const taskFound = chapterFound.sections.find(element => element.sectionId == taskId)
                if (taskFound) { 
                    const exerciseFound = taskFound.exercises.find(element => element.exerciseId == id)
                    if (exerciseFound){
                        setCompleted(true)
                    }
                    else {
                        setCompleted(false)
                    }
                }
            } 

      }, [progress]);
     


    const isCompleted = completed//completed.includes(excId)
     /*
    const handleSetCompleted = useCallback(() => {
       const newCompleted = isCompleted
            ? completed.filter(v => v !== excId)
            : [...completed, excId]

        console.log(newCompleted )
        setTaskCompleted(newCompleted.includes(excId))
        setCompleted(newCompleted)
        completeExercise1()

    }, [isCompleted, completed, excId, setCompleted]) */
    
    const rootClassNames = classNames(classes.root, {
        [classes.expanded]: true,
        [classes.completed]: completed,
    })
    
    const titleClassNames = classNames(classes.title, {
        [classes.titleExpanded]: true,
    });

    const [taskCompleted, setTaskCompleted]   = useState(isCompleted);
    
    
    return (
    
        <section ref={excRef} id={id} className={rootClassNames}>
            <div>Welcome {"a"} {progress ? JSON.stringify(progress) : ""}</div>
            <h2 className={titleClassNames}>
                <span>
                    <span
                        className={classNames(classes.id, { [classes.idCompleted]: completed })}
                    >
                        {excId}
                    </span>
                    {title}
                </span>
                {type === 'slides' && <IconSlides className={classes.icon} />}
            </h2>
   
            <div>

            <ExerciseContext.Provider value={{taskCompleted}}>       
                {children}     

            </ExerciseContext.Provider>

                <footer className={classes.footer}>
                    {isAuthenticated && <CompleteButton
                        completed={completed}
                        toggleComplete={toggleComp}
                    />
                }
                    {/* <Button onClick={handleNext} variant="secondary" small>
                        Next
                    </Button> */}
                </footer>
            </div>
        </section>
    )
}

export default TaskExercise
