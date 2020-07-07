import React from 'react';
import HorizontalTimeline from 'react-horizontal-timeline';
import './timeline.style.css';

const VALUES = ['2020-06-27', '2020-07-01', '2020-08-01', '2020-09-01', '2020-10-01', '2020-11-01', '2020-12-01', '2020-08-01', '2021-01-01', '2021-01-01'];

export default class Timeline extends React.Component {
  state = { value: 0, previous: 0 };

  render() {
    return (
      <div>
        {/* Bounding box for the Timeline */}
        <div style={{ width: '100%', height: '100px', margin: '0 auto' }}>
          <HorizontalTimeline
            index={this.state.value}
            indexClick={(index) => {
              this.setState({ value: index, previous: this.state.value });
            }}
            values={ VALUES } />
        </div>
        <div className='timeline-image'>
          {/* any arbitrary component can go here */}
          <img src="https://source.unsplash.com/random" alt="Logo" />;
          {this.state.value}
        </div>
      </div>
    );
  }
}