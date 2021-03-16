import React, {Component} from "react"
import classes from '../styles/headerburger.module.sass'
import Login from '../components/login'
import { menuData } from '../data/MenuData'
import { FaBars, FaTimes } from 'react-icons/fa'
import {navigate} from 'gatsby'

class HeaderBurger extends Component{

    constructor(props) {
        super(props);
        this.state = {active: false};
    }
    handleClick = () => {
        this.setState({ active: !this.state.active });
    };



    render () {
        return (
            <div>
                <div className={classes.bars} onClick={this.handleClick}>
                    { !this.state.active && <FaBars/>}
                </div>
                { this.state.active &&
                    <div className={classes.burgermenu} onClick={this.handleClick}>
                        <div className={classes.bars} onClick={this.handleClick}>
                            <FaTimes/>
                        </div>
                        <div className={classes.menucontent}>
                            {menuData.map((item, index) => (
                                <h1 className={classes.navlink} onClick={() => navigate(item.link)} key={index}>
                                    {item.title}
                                </h1>
                            ))}
                            <div className={classes.loginbutton}>
                                <Login></Login>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }

}

export default HeaderBurger