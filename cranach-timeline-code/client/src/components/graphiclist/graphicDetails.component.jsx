/* eslint-disable */
import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {useHistory} from "react-router-dom";
import {path} from '../../config/env.config';
import axios from "axios";

export const GraphicDetails = (props) => {
    let styleClass =  props.value;
    const [graphic, setGraphic] = useState({});
    const history = useHistory();
    const selectedID = history.location.search.replace("?id=","");
    console.log("selectedGraphic updated ", graphic);
   
    const getData = () => {
        axios
            .get(`${path}/graphics/getGraphic`, {
            params: {
                id: selectedID
            },
            })
            .then((res) => {
                console.log("response getGraphic:", res.data)
                setGraphic(res.data);
            })
    }
    useEffect(() => {
        getData();
        console.log("****************")
     }, []);
    if(!graphic.images){
        return(
            <Typography component="span">Loading ...</Typography>
        )
    }else{
        console.log("graphic befor return",graphic)
        return (
            <div>
                <Typography variant="h3" align="center" className="title-spacing-bottom">
                    Einzelheiten
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <img src={graphic.images.sizes.xs.src} width={'100%'} alt={graphic.titles[0].title} />
                    </Grid>
                    <Grid item xs={7}>
                        <Paper className={styleClass.paper}>
                            <div className={styleClass.typoPadding}>
                                <Typography variant="h6" component="h6">
                                    Titel 
                                </Typography>
                                <Typography component="span">
                                    {graphic.titles[0].title}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Erfinder 
                                </Typography>
                                <Typography component="span">
                                    {graphic.involvedPersons[0].name}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Inhaber
                                </Typography>
                                <Typography component="span">
                                    {graphic.owner}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Datum 
                                </Typography>
                                <Typography component="span">
                                    {graphic.dating.dated}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Maße 
                                </Typography>
                                <Typography component="span">
                                    {graphic.dimensions}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Objektname
                                </Typography>
                                <Typography component="span">
                                    {graphic.objectName}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Standort
                                </Typography>
                                <Typography component="span">
                                    {graphic.locations[0].term}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Herkunft
                                </Typography>
                                <Typography component="span">
                                    {graphic.provenance}
                                </Typography>
                                <Divider />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

