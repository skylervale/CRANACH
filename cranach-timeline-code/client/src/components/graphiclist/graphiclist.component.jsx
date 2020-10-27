import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {useHistory} from "react-router-dom";

export const Graphiclist = (props) => {
    let styleClass =  props.value;
    let setGraphic = props.setGraphic;
    const history = useHistory();
    return (
        <div className={styleClass.root}>
            <GridList cols={4} spacing={30} cellHeight={400} className={styleClass.gridList}>
                {props.graphics.map((graphic, index) => (
                    <GridListTile key={index} onClick={()=>{
                        console.log("graphic: ", graphic);
                        history.push(
                            {
                                pathname: '/graphicdetails',
                                search: "id="+graphic.id
                            }
                        );
                    }}>
                        <img src={graphic.images.sizes.xs.src} alt={graphic.titles.title} />
                        <GridListTileBar
                        title={graphic.titles[0].title}
                        subtitle={<span>Von: {graphic.owner}</span>}
                        />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

