import React from 'react'
import classes from '../styles/video.module.sass'


const Video = ({url}) => { 
    return ( 
        <div className={classes.videoContainer}>
            <iframe title="Video" frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen src={url}>
            </iframe>                  
        </div>
    );
};

export default Video 