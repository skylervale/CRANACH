import React from 'react';
import HorizontalTimeline from 'react-horizontal-timeline';
import './timeline.style.css';
import {Gallery} from "./gallery.component";

const axios = require('axios').default;

export default class Timeline extends React.Component {
    state = {
        value: 0,
        previous: 0,
        dates: [],
        graphics: [],
    };

    componentDidMount() {
        axios.get(`http://localhost:9000/graphics/timeline`)
            .then(res => {
                let dates = Object.keys(res.data).map(date => date);
                
                this.setState({
                    dates: dates,
                    graphics: res.data
                });
            });
    };

    render() {
        console.log(this.state.graphics);
        return (
            <div>
                {/* Bounding box for the Timeline */}
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
                
                <Gallery data={this.state.graphics[this.state.dates[this.state.value]]}/>
                
                <div className='text-center'>
                    {/* any arbitrary component can go here */}
                </div>
            </div>
        );
    }
}