/* eslint-disable */
import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
//import GridListTileBar from '@material-ui/core/GridListTileBar';
//import ListSubheader from '@material-ui/core/ListSubheader';
//import IconButton from '@material-ui/core/IconButton';
//import InfoIcon from '@material-ui/icons/Info';
//const axios = require('axios').default;


export default class PaintingDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            painting: {}
        };
    }
    render() {
        let styleClass =this.props.value;
        return (
            <div className={styleClass.root}>
                {console.log("Details: ", this.props.painting)}
            </div>
        );
    }
}

