import React, {Fragment, useRef, useState} from 'react';
import ImageScroller from 'react-image-scroller';
import defaultStatus from 'react-image-scroller';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import classNames from 'classnames';
import './timeline.style.css';
import * as Scroll from 'react-scroll';
import axios from 'axios';
let Element  = Scroll.Element;
let scroller = Scroll.scroller;

let images = [
    <img src="http://lucascranach.org/imageserver/G_AT_A_DG1929-82/01_Overall/G_AT_A_DG1929-82_Overall-xs.jpg" alt="Camel" />,
    <img src="http://lucascranach.org/imageserver/G_AT_A_DG1929-85/01_Overall/G_AT_A_DG1929-85_Overall-xl.jpg" alt="Camel" />,
    <img src="http://lucascranach.org/imageserver/G_AT_A_DG1929-138/01_Overall/G_AT_A_DG1929-138_Overall-m.jpg" alt="Camel" />,
    <img src="http://lucascranach.org/imageserver/G_AT_A_DG1929-82/01_Overall/G_AT_A_DG1929-82_Overall-xs.jpg" alt="Camel" />,
    <img src="http://lucascranach.org/imageserver/G_AT_A_DG1929-85/01_Overall/G_AT_A_DG1929-85_Overall-xl.jpg" alt="Camel" />,
    <img src="http://lucascranach.org/imageserver/G_AT_A_DG1929-138/01_Overall/G_AT_A_DG1929-138_Overall-m.jpg" alt="Camel" />
];

export function Gallery(props) {
    const [showScrollbar, setShowScrollbar] = useState(false);
    const [useThinScrollbar, setUseThinScrollbar] = useState(true);
    const [showIndexButtons, setShowIndexButtons] = useState(true);
    const [status, setStatus] = useState(defaultStatus);
    const { data } = props
    // uncomment to display dynamic data
    // if (data){
    //     images = Object.values(data).map((graphic) =>
    //         <LazyLoadImage src={graphic.images.sizes.m.src} alt="ok"/>
    //     )
    // }
    return (
        <div>
            <div className="image-gallery">
                <ImageScroller
                    className="scroller"
                    scrollContainerClassName={classNames({
                        'scroller__scroll-container--use-thin': useThinScrollbar,
                    })}
                    innerClassName="scroller__inner"
                    hideScrollbar={!showScrollbar}
                    onChange={newStatus => setStatus(newStatus)}
                    renderWithin={({
                                    scrollTo,
                                    next,
                                    previous,
                                    items,
                                    status,
                                }) => (
                        <>
                            {status.previous !== null && (
                                <button
                                    onClick={next}
                                    className="nav-button nav-button--previous"
                                    aria-label="Previous"
                                >
                                    &lsaquo;
                                </button>
                            )}
                            {status.next !== null && (
                                <button
                                    onClick={next}
                                    disabled={status.next === null}
                                    className="nav-button nav-button--next"
                                    aria-label="Next"
                                >
                                    &rsaquo;
                                </button>
                            )}

                            {showIndexButtons && (
                                <div className="index-buttons">
                                    {items.map((item, itemIndex) => (
                                        <button
                                            key={itemIndex}
                                            onClick={() => scrollTo(itemIndex)}
                                            title={itemIndex + 1}
                                            aria-label={`Image ${itemIndex +
                                            1} of ${images.length}`}
                                            className={classNames({
                                                'index-button': true,
                                                'index-button--current': status.current.includes(
                                                    itemIndex
                                                ),
                                                'index-button--adjacent':
                                                    status.previous ===
                                                    itemIndex ||
                                                    status.next === itemIndex,
                                            })}

                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                >
                    {images.map((item, itemIndex) => (
                        <div
                            key={itemIndex}
                            className={classNames({
                                'image-wrapper': true,
                                'image-wrapper--scrollbar': showScrollbar,
                            })}
                        >
                            {item}
                        </div>
                    ))}
                </ImageScroller>
            </div>
        </div>
    );

}