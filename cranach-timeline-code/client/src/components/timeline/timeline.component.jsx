import React from 'react';
import HorizontalTimeline from 'react-horizontal-timeline';
import './timeline.style.css';
import {Gallery} from "./gallery.component";
import { withStyles } from '@material-ui/core/styles';
import { green, blue } from '@material-ui/core/colors';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {path} from '../../config/env.config';

const axios = require('axios').default;
const GreenCheckbox = withStyles({
    root: {
        color: green[400],
        '&$checked': {
        color: green[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);
const BlueCheckbox = withStyles({
    root: {
        color: blue[400],
        '&$checked': {
        color: blue[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);


export default class Timeline extends React.Component {
    
    state = {
        value: 0,
        previous: 0,
        dates: [],
        result: [],
        checked: localStorage.getItem('timelineContent') || 'graphics'
    };


    getData = (categoryName) => {
        axios.get(`${path}/${categoryName}/timeline`)
            .then(res => {
                let dates = Object.keys(res.data).map(date => date);
                this.setState({
                    dates: dates,
                    result: res.data
                });
            });
    }

    componentDidMount() {
        this.getData(this.state.checked);
    }

    handleChange = (event) => {
        const {name} = event.target
        this.setState({checked: name});
        this.getData(name);
        localStorage.setItem('timelineContent', name);
    };

    render() {
        console.log(this.state.result);
        return (
            <div>
                {/* Bounding box for the Timeline */}
                <div>
                    <FormLabel component="legend">Zeitstrahl-Inhalt</FormLabel>  
                    <FormGroup row>
                        <FormControlLabel
                            control={<BlueCheckbox checked={this.state.checked === "paintings"} onChange={this.handleChange} name="paintings" />}
                            label="Gemälde"
                        />
                        <FormControlLabel
                            control={<GreenCheckbox checked={this.state.checked === "graphics"} onChange={this.handleChange} name="graphics" />}
                            label="Grafiken"
                        />
                    </FormGroup>
                </div>
                <div className="timeline" style={{width: '100%', height: '100px', margin: '0 auto'}}>
                    <HorizontalTimeline
                        index={this.state.value}
                        indexClick={(index) => {
                            this.setState({value: index, previous: this.state.value});

                        }}
                        values={this.state.dates}
                        minEventPadding={20}
                        maxEventPadding={20}
                        linePadding={160}
                        isKeyboardEnabled={true}
                        isTouchEnabled={true}
                        getLabel={(date, index) => (new Date(date)).toDateString().substring(10)}
                        styles={{background: '#f8f8f8', foreground: 'red', outline: 'red'}}
                    />
                </div>
                
                <Gallery checked={this.state.checked} data={this.state.result[this.state.dates[this.state.value]]}/>

            </div>
        );
    }
}