/* eslint-disable */
import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
//import ListSubheader from '@material-ui/core/ListSubheader';
//import IconButton from '@material-ui/core/IconButton';
//import InfoIcon from '@material-ui/icons/Info';
//const axios = require('axios').default;


export default class Paintinglist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paintings: []
        };
    }
    render() {
        let styleClass =this.props.value;
        return (
            <div className={styleClass.root}>
                <GridList cellHeight={400} className={styleClass.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    </GridListTile>
                    {this.props.paintings.map((painting, index) => (
                        console.log("Paiting: ", painting),
                        <GridListTile key={index}>
                            <img src={painting.images.sizes.xs.src} alt={painting.titles.title} />
                            <GridListTileBar
                            title={painting.titles[0].title}
                            subtitle={<span>by: {painting.owner}</span>}
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
}

