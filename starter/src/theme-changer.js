import React, { useState, useEffect } from 'react'
import classes from './styles/theme-changer.module.sass'
//import 'localstorage-polyfill'

const ThemeChanger = () => {


  const [themeState, setThemeState] = useState(typeof window !== 'undefined' ? (localStorage.getItem('Theme') === 'dark' ? false : true) : false);

  const handleChange = () => {
    setThemeState(!themeState);
    if (themeState) {
      localStorage.setItem('Theme', 'dark');
      document.body.classList.add('dark-mode');
    } else {
      localStorage.setItem('Theme', 'light');
      document.body.classList.remove('dark-mode');
    }
  }
  useEffect(() => {
    const getTheme = localStorage.getItem('Theme');
    if (getTheme === 'dark') return document.body.classList.add('dark-mode');
  })
  return (
    <div className={classes.themeButton}>
      <button onClick={handleChange}>{themeState ? 'Dark Mode' : 'Light Mode'}</button>
    </div>
  )
  // useEffect(() => {
  //   const getTheme = localStorage.getItem('Theme');
  //   if (getTheme === 'dark') {
  //     setThemeState(true);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (themeState) {
  //     localStorage.setItem('Theme', 'dark');
  //     document.body.classList.add('dark-mode');
  //   } else {
  //     localStorage.setItem('Theme', 'light');
  //     document.body.classList.remove('dark-mode');
  //   }
  // }, [themeState]);

  // return (
  //   <div className={classes.themeButton}>
  //     <button onClick={() => setThemeState(!themeState)}>{themeState ? 'Light Mode' : 'Dark Mode'}</button>
  //   </div>
  // );

}

export default ThemeChanger;