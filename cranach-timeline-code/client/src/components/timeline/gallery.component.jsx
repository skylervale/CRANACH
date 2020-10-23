import React, {Fragment, useRef, useState} from 'react';
//import ImageScroller from 'react-image-scroller';
import ImageGallery from 'react-image-gallery';
//import defaultStatus from 'react-image-scroller';
//import { LazyLoadImage } from 'react-lazy-load-image-component';
//import classNames from 'classnames';
import './timeline.style.css';
//import * as Scroll from 'react-scroll';
//import axios from 'axios';
//let Element  = Scroll.Element;
//let scroller = Scroll.scroller;

let images = [];

console.log("Static: ",images);

export function Gallery(props) {
    /*const [showScrollbar, setShowScrollbar] = useState(false);
    const [useThinScrollbar, setUseThinScrollbar] = useState(true);
    const [showIndexButtons, setShowIndexButtons] = useState(true);
    const [status, setStatus] = useState(defaultStatus);*/
    const { data } = props
    console.log(data);
    if (data){
        
        images = Object.values(data).map((graphic, index) => (
            
            {
                original: graphic.images.sizes.xs.src,
                thumbnail: graphic.images.sizes.xs.src,
                sizes: "200px",
                description: data[index].titles[0].title
            }
        
        ))
    }
    console.log(images);
    return (
            
        <ImageGallery showThumbnails="true" showPlayButton="false" thumbnailPosition="left" showIndex="true" items={images} />
    );

}