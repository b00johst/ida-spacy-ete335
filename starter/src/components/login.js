import React, {useEffect} from "react";
import { Button } from './button';
import { useMsal } from '../utility/auth/msalContext';
import { loginRequest } from "../utility/auth/msalConfig";
import classes from '../styles/login.module.sass'

function Login() {
  const { loading, isAuthenticated, login, logout, user, profile, progress, getUserProfileFromGraph, getUserProgressFromApi, saveCompletedExerciseToApI, removeCompletedExerciseFromApi, getUserLastCompletedFromApi } = useMsal();

  if (loading){
    return <div>Loading ...</div>
  }

  const completeExercise1 = async() => {    
    var testObject = { selectedOptions: ['a', 'b'] }
    await saveCompletedExerciseToApI("testchapter", "testsection", "exercise1", testObject);    
  }

  const completeExercise2 = async() => {    
    var testObject = { selectedOptions: ['a', 'b', 'c'] }
    await saveCompletedExerciseToApI("testchapter", "testsection", "exercise2", testObject);    
  }

  const removeCompletedExercise1 = async() => {    
    await removeCompletedExerciseFromApi("testchapter", "testsection", "exercise1");    
  }

  const removeCompletedExercise2 = async() => {    
    await removeCompletedExerciseFromApi("testchapter", "testsection", "exercise2");    
  }

  const getLastCompleted = async() => {
    const result = await getUserLastCompletedFromApi();
    if (result.exerciseData){
      var exerciseData = JSON.parse(result.exerciseData);
      console.log("last completed exercise contains data:", exerciseData);
    }
    alert(JSON.stringify(result));
  }

  return (
    <div>
      {!isAuthenticated && (
        <button className={classes.button} small color="primary" onClick={() => login(loginRequest, "loginRedirect")}>Logga in</button>
      )}
      {isAuthenticated && (
        <div>
          <div>Welcome {user.name} {progress ? JSON.stringify(progress) : ""}</div>
          <button className={classes.button} small color="primary" onClick={() => logout()}>Logga ut</button>
          <button className={classes.button} small color="primary" onClick={() => getUserProfileFromGraph()}>Get profile</button>  
          <button className={classes.button} small color="primary" onClick={() => completeExercise1()}>Complete1</button>
          <button className={classes.button} small color="primary" onClick={() => removeCompletedExercise1()}>Uncomplete1</button>
          <button className={classes.button} small color="primary" onClick={() => completeExercise2()}>Complete2</button>
          <button className={classes.button} small color="primary" onClick={() => removeCompletedExercise2()}>Uncomplete2</button>
          <button className={classes.button} small color="primary" onClick={() => getLastCompleted()}>Get last completed</button>        
          {profile && (
            <div>              
              <pre>{JSON.stringify(profile)}</pre>
            </div>
          )}
        </div>        
      )}
    </div>
  );
}

export default Login;