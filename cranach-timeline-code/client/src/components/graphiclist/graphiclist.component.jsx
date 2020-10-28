import React, {useEffect, useState} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import {useHistory} from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import axios from "axios";
export const Graphiclist = (props) => {
    let styleClass =  props.value;
    const history = useHistory();
    const [graphics, setGraphics] = useState([]);
    const {filter, searchText} = props
    const getGraphics = () => {
        // url encode arrays
        // let urlEncodedFilter = filter;
        // let stringifiedArray;
        // for (const [key, value] of Object.entries(filter)) {
        //   if (Array.isArray(value)) {
        //     stringifiedArray = value.map((v, index) => `${key}[${index}]=${v}`).join('&')
        //     urlEncodedFilter = {
        //       ...urlEncodedFilter,
        //       [key]: stringifiedArray
        //     }
        //   }
        // }
        axios.get(`http://localhost:9000/graphics/search`, {
              params: {
                text: searchText,
                ...filter
              },
            })
            .then((res) => {
              let graphicsList = []
              console.log(typeof res.data)
              Object.values(res.data).map((graphic) => {
                if (graphic.images) graphicsList.push(graphic)
              })
              console.log('graphicsList', graphicsList)
              setGraphics(graphicsList)
            })
    }
    useEffect(() => {
        getGraphics()
    }, [searchText, filter]);

    if(graphics.length === 0){
        return(
            <Typography component="span">Loading ...</Typography>
        )
    }else {
    return (
        <div className={styleClass.root}>
            <GridList cols={4} spacing={30} cellHeight={400} className={styleClass.gridList}>
                {graphics.map((graphic, index) => (
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
}

