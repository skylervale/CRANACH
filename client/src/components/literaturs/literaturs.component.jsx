/* eslint-disable */
import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
//import ListSubheader from '@material-ui/core/ListSubheader';
//import IconButton from '@material-ui/core/IconButton';
//import InfoIcon from '@material-ui/icons/Info';
//const axios = require('axios').default;


export default class LiteratursList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            literaturs: []
        };
    }
    render() {
        let styleClass = this.props.value;
        return (
            <div className={styleClass.root}>
                <GridList cellHeight={400} className={styleClass.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    </GridListTile>
                    {this.props.literaturs.map((literatur, index) => (
                        console.log("Paiting: ", literatur),
                        <GridListTile key={index}>
                            <img src={literatur.images.sizes.xs.src} alt={literatur.titles.title} />
                            <GridListTileBar
                            title={literatur.titles[0].title}
                            subtitle={<span>by: {literatur.owner}</span>}
                            // actionIcon={
                            //     <IconButton aria-label={`info about ${literatur.dating}`} className={styleClass.icon}>
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
}

