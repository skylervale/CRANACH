/* eslint-disable */
import React, {useEffect, useState} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {useHistory} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

export const Paintinglist = (props) => {
    let {searchText, filter, value: styleClass} = props;
    const history =  useHistory();
    const [paintings, setPaintings] = useState(null);
    const getPaintings = () => {
        axios.get(`http://localhost:9000/paintings/search`, {
            params: {
                text: searchText,
                ...filter
            },
        })
          .then((res) => {
            let paintingList = [];
            Object.values(res.data).map((painting) => {
                if (painting.images) paintingList.push(painting);
            })
            console.log('paintingList cccccc', paintingList)
            setPaintings(paintingList)
          })
    }
    useEffect(() => {
        getPaintings()
    }, [searchText, filter]);
    
    if(!paintings){
        return(
            <div className={styleClass.root} style={{minHeight: 300 + "px", textAlign: "center"}} >
                <CircularProgress />
                <Typography component="span">Loading ...</Typography>
            </div>
        )
    } else if (paintings.length === 0){
        return (
                <div className={styleClass.root} style={{minHeight: 300 + "px", textAlign: "center"}} >
                    <Typography component="span">No records found</Typography>
                </div>
            )
    }else {
        return (
            <div className={styleClass.root}>
                <GridList cols={4} spacing={30} cellHeight={400} className={styleClass.gridList}>
                    {paintings.map((painting, index) => (
                        
                        <GridListTile key={index} onClick={()=>{
                            console.log("painting: ", painting);
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
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

