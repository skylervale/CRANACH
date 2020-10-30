import React, {useRef} from 'react';
import ImageGallery from 'react-image-gallery';
import './timeline.style.css';
import {useHistory} from "react-router-dom";

export function Gallery(props) {
    const { data, checked } = props;
    const history = useHistory();
    const galleryRef = useRef(null)

    let pathName = "/graphicdetails";
    if (checked === "paintings") {
        pathName = "/paintingdetails";
    }
    let images = [];
    if (data){
        images = Object.values(data).map((graphic, index) => (
            {
                original: graphic.images.sizes.xs.src,
                thumbnail: graphic.images.sizes.xs.src,
                sizes: "200px",
                description: data[index].titles[0].title,
                id: graphic.id
            }
        ))
    }
    const HandleImageClick = () => {
        const index = galleryRef.current.getCurrentIndex()
        const {id} = data[index]
        history.push({ pathname: pathName, search: "id="+id });
    }
    return (
        <ImageGallery
            onClick={HandleImageClick}
            showThumbnails="true"
            showPlayButton="false"
            thumbnailPosition="left"
            showIndex="true"
            items={images}
            lazyLoad={true}
            ref={galleryRef}
        />
    );

}