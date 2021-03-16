import React from "react"
import Login from '../components/login'
import HeaderBurger from '../components/header-burger'
import {navigate} from 'gatsby'
import classes from '../styles/header.module.sass'
import { menuData } from '../data/MenuData'
import { FaBars } from 'react-icons/fa'

const Header = () => {
    return (
        <div className={classes.nav}>
            <div className={classes.navmenu}>
                {menuData.map((item, index) => (
                    <h1 className={classes.navlink} onClick={() => navigate(item.link)} key={index}>
                        {item.title}
                    </h1>
                ))}
            </div>

           <div className={classes.login}>
                <Login></Login>
            </div>
            <div className={classes.burger}>
                <HeaderBurger props={classes.nav}></HeaderBurger>
            </div>
        </div>
    
    )
}

export default Header