
import React from 'react'
import classes from '../styles/footer.module.sass'


const Footer = () => {
    

    return (
        <div className={classes.footer}>
            <div className={classes.content}>
                <div>
                    <p>Institutionen för datavetenskap</p>            
                    <p>Kontakt: Marco Kuhlmann</p>
                    
                </div>
                <div> <p>Denna kurs handlar om ..</p></div>
                <div>
                    <strong>Bra länkar</strong>
                    <ul>
                        <li>Hem</li>
                        <li>Chapter</li>
                        <li>FAQ</li>
                        </ul> 
                </div>
            </div>
           
        </div>

    )
}

export default Footer