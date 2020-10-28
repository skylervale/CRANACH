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
        checked: 'paintings',
    };


    getData = (categoryName) => {
        axios.get(`http://localhost:9000/${categoryName}/timeline`)
            .then(res => {
                let dates = Object.keys(res.data).map(date => date);
                this.setState({
                    dates: dates,
                    result: res.data
                });
            });
    }

    componentDidMount() {
        this.getData("paintings");
    }

    handleChange = (event) => {
        const {name} = event.target
        this.setState({checked: name});
        this.getData(name);

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
                            control={<GreenCheckbox checked={this.state.checked === "graphics"} onChange={this.handleChange} name="graphics" />}
                            label="Grafiken"
                        />
                        <FormControlLabel
                            control={<BlueCheckbox checked={this.state.checked === "paintings"} onChange={this.handleChange} name="paintings" />}
                            label="Gemälde"
                        />
                    </FormGroup>
                </div>
                <div style={{width: '100%', height: '100px', margin: '0 auto'}}>
                    <HorizontalTimeline
                        index={this.state.value}
                        indexClick={(index) => {
                            this.setState({value: index, previous: this.state.value});

                        }}
                        values={this.state.dates}
                        minEventPadding={50}
                        maxEventPadding={50}
                        linePadding={160}
                        getLabel={(date, index) => (new Date(date)).toDateString().substring(10)}
                        styles={{background: '#f8f8f8', foreground: 'orange', outline: 'orange'}}
                    />
                </div>
                
                <Gallery checked={this.state.checked} data={this.state.result[this.state.dates[this.state.value]]}/>

            </div>
        );
    }
}