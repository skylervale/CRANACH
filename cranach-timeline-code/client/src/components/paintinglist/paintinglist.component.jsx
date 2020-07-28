/* eslint-disable */
import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
const axios = require('axios').default;


export default class Paintinglist extends React.Component {
    state = {
        paintings: []
    };

    componentDidMount() {
        axios.get(`http://localhost:9000/graphics/timeline`)
            .then(res => {
                let paintings = res.data;
                this.setState({
                    paintings: paintings
                });
            });
    }

    render() {
        let styleClass =this.props.value;
        return (
            <div className={styleClass.root}>
                <GridList cellHeight={400} className={styleClass.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    </GridListTile>
                    {this.state.paintings.map((painting) => (
                        <GridListTile key={painting.index}>
                            <img src={painting.images.sizes.xs.src} alt={painting.title} />
                            <GridListTileBar
                            title={painting.title}
                            subtitle={<span>by: {painting.author}</span>}
                            actionIcon={
                                <IconButton aria-label={`info about ${painting.title}`} className={styleClass.icon}>
                                <InfoIcon />
                                </IconButton>
                            }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

