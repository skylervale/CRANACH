import React from 'react';
import HorizontalTimeline from 'react-horizontal-timeline';
import './timeline.style.css';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
const axios = require('axios').default;

//const VALUES = ['2020-06-27', '2020-07-01', '2020-08-01', '2020-09-01', '2020-10-01', '2020-11-01', '2020-12-01', '2020-08-01', '2021-01-01', '2021-01-01'];
export default class Timeline extends React.Component {
  state = {
      value: 0,
      previous: 0,
      dates: [],
      images: [],
      titles: [],
      photoIndex: 0,
      isOpen: false,
  };

  componentDidMount() {
      axios.get(`http://localhost:9000/graphics/timeline`)
          .then(res => {
              let graphics = res.data;
              let dates = [];
              let images = [];
              let titles = [];
              graphics.map(function(item) {
                  
                  dates.push(item.dating.dated);
                  images.push(item.images);
                  titles.push(item.titles[0].title);
              });
              console.log(titles)
              this.setState({
                  dates: dates,
                  images: images,
                  titles: titles
              });
          })
  }

    render() {
        const { value, isOpen } = this.state;
        return (
      <div>
        {/* Bounding box for the Timeline */}
        <div style={{ width: '100%', height: '100px', margin: '0 auto' }}>
          <HorizontalTimeline
            index={this.state.value}
            indexClick={(index) => {
              this.setState({ value: index, previous: this.state.value });
            }}
            values={ this.state.dates }
            minEventPadding={50}
            maxEventPadding={50}
            linePadding={160}
            getLabel={ (date, index) => (new Date(date)).toDateString().substring(10) }
            styles={{ background: '#f8f8f8', foreground: 'orange', outline: 'orange' }}
          />
        </div>

            {
                this.state.images.length !== 0 &&
                <div className='timeline-image'>
                    <img  src={this.state.images[this.state.value].sizes.s.src} alt="Logo" onClick={() => this.setState({ isOpen: true })} />
                </div>
            }
            {isOpen && (
                <Lightbox
                    mainSrc={this.state.images[value].sizes.l.src}
                    nextSrc={this.state.images[(value + 1) % this.state.images.length].sizes.l.src}
                    prevSrc={this.state.images[(value + this.state.images.length - 1) % this.state.images.length].sizes.l.src}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    onMovePrevRequest={() =>
                        this.setState({
                            value: (value + this.state.images.length - 1) % this.state.images.length,
                        })
                    }
                    onMoveNextRequest={() =>
                        this.setState({
                            value: value + 1 % this.state.images.length,
                        })
                    }
                 />
            )}
            <div className='text-center'>
                {/* any arbitrary component can go here */}    
                {this.state.titles[this.state.value]}
            </div>
      </div>
    );
  }
}