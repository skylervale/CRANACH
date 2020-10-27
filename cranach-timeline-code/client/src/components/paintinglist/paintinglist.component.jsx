/* eslint-disable */
import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {useHistory} from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage'
//import ListSubheader from '@material-ui/core/ListSubheader';
//import IconButton from '@material-ui/core/IconButton';
//import InfoIcon from '@material-ui/icons/Info';
//const axios = require('axios').default;

export const Paintinglist = (props) => {
    let styleClass =  props.value;
    let setPainting = props.setPainting;
    const history = useHistory();
    return (
        <div className={styleClass.root}>
            <GridList cols={4} spacing={30} cellHeight={400} className={styleClass.gridList}>
                {props.paintings.map((painting, index) => (
                    <GridListTile key={index} onClick={()=>{
                        console.log("painting: ", painting);
                        //setPainting(painting)
                        //AsyncStorage.setItem('selectedPainting', JSON.stringify(painting));
                        history.push(
                            {
                                pathname: '/paintingdetails',
                                search: "id="+painting.id
                            }
                        );
                    }}>
                        <img src={painting.images.sizes.xs.src} alt={painting.titles.title} />
                        <GridListTileBar
                        title={painting.titles[0].title}
                        subtitle={<span>Von: {painting.owner}</span>}
                        // actionIcon={
                        //     <IconButton aria-label={`info about ${painting.dating}`} className={styleClass.icon}>
                        //     <InfoIcon />
                        //     </IconButton>
                        // }
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

