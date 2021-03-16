import React, {Component} from "react";
import classes from '../styles/question.module.sass'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'


class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {toggled: false};
    }

    handleClick = () => {
        this.setState({ toggled: !this.state.toggled });
    };

    render () {
        return (
            <div className={classes.container}>
                <div className={classes.question} onClick={this.handleClick}>
                    <h2>{this.props.question}</h2>
                    { this.state.toggled &&
                        <div className={classes.toggleicon}><FaChevronUp/></div>
                    }
                    { !this.state.toggled &&
                        <div className={classes.toggleicon}><FaChevronDown/></div>
                    }
                </div>

                { this.state.toggled &&
                    <div className={classes.answer}>
                        <p>{this.props.answer}</p>
                    </div>
                }
                
            </div>
        );
    }
}

export default Question;