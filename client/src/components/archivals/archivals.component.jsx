/* eslint-disable */
import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
//import ListSubheader from '@material-ui/core/ListSubheader';
//import IconButton from '@material-ui/core/IconButton';
//import InfoIcon from '@material-ui/icons/Info';
//const axios = require('axios').default;


export default class ArchivalsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            archivals: []
        };
    }
    render() {
        let styleClass = this.props.value;
        return (
            <div className={styleClass.root}>
                <GridList cellHeight={400} className={styleClass.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    </GridListTile>
                    {this.props.archivals.map((archival, index) => (
                        console.log("Paiting: ", archival),
                        <GridListTile key={index}>
                            <img src={archival.images.sizes.xs.src} alt={archival.titles.title} />
                            <GridListTileBar
                            title={archival.titles[0].title}
                            subtitle={<span>by: {archival.owner}</span>}
                            // actionIcon={
                            //     <IconButton aria-label={`info about ${archival.dating}`} className={styleClass.icon}>
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

