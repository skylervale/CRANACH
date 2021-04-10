/* eslint-disable */
import React, {useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {useHistory} from "react-router-dom";
import {path} from '../../config/env.config';
import axios from "axios";

export const PaintingDetails = (props) => {
    let styleClass =  props.value;
    const [painting, setPainting] = useState({});
    const history = useHistory();
    const selectedID = history.location.search.replace("?id=","");
    console.log("selectedPainting updated ", painting);
   
    const getData = () => {
        axios
            .get(`${path}/paintings/getPainting`, {
            params: {
                id: selectedID
            },
            })
            .then((res) => {
                console.log("response getPainting:", res.data)
                setPainting(res.data);
            })
    }
    useEffect(() => {
        getData();
        console.log("****************")
     }, []);
    if(!painting.images){
        return(
            <Typography component="span">Loading ...</Typography>
        )
    }else{
        console.log("painting befor return",painting)
        return (
            <div>
                <Typography variant="h3" align="center" className="title-spacing-bottom">
                    Einzelheiten
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <img src={painting.images.sizes.xs.src} width={'100%'} alt={painting.titles[0].title} />
                    </Grid>
                    <Grid item xs={7}>
                        <Paper className={styleClass.paper}>
                            <div className={styleClass.typoPadding}>
                                <Typography variant="h6" component="h6">
                                    Titel 
                                </Typography>
                                <Typography component="span">
                                    {painting.titles[0].title}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Erfinder 
                                </Typography>
                                <Typography component="span">
                                    {painting.involvedPersons[0].name}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Inhaber
                                </Typography>
                                <Typography component="span">
                                    {painting.owner}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Datum 
                                </Typography>
                                <Typography component="span">
                                    {painting.dating.dated}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Maße 
                                </Typography>
                                <Typography component="span">
                                    {painting.dimensions}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Objektname
                                </Typography>
                                <Typography component="span">
                                    {painting.objectName}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Standort
                                </Typography>
                                <Typography component="span">
                                    {painting.locations[0].term}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Unterschrift
                                </Typography>
                                <Typography component="span">
                                    {painting.signature}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Beschreibung
                                </Typography>
                                <Typography component="span">
                                    {painting.description}
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

