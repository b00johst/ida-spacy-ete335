import React, { useContext} from 'react'
import classNames from 'classnames'

import IconCheck from '../../static/icon_check.svg'
import classes from '../styles/chapter-item.module.sass'
import { TaskContext } from "../context/index";
import { Link } from "gatsby"

export const ChapterItem = ({children, keyValue, title, description, url}) => {
  console.log(url)
    return (
      <Link to={url}>
        <div className={classes.item}>
            <span className={classes.itemNr}>{keyValue}</span>
            <span>{title}</span>
          
            {children}
            {description}     
        </div>
      </Link>
    )
}
