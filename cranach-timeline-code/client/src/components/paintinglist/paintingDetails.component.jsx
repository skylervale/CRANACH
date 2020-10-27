/* eslint-disable */
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={5}>
                        <img src={this.props.painting.images.sizes.xs.src} width={'100%'} alt={this.props.painting.titles[0].title} />
                    </Grid>
                    <Grid item xs={7}>
                        <Paper className={styleClass.paper}>
                            <div className={styleClass.typoPadding}>
                                <Typography variant="h6" component="h6">
                                    Titel 
                                </Typography>
                                <Typography component="span">
                                    {this.props.painting.titles[0].title}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Erfinder 
                                </Typography>
                                <Typography component="span">
                                    {this.props.painting.involvedPersons[0].name}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Inhaber
                                </Typography>
                                <Typography component="span">
                                    {this.props.painting.owner}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Datum 
                                </Typography>
                                <Typography component="span">
                                    {this.props.painting.dating.dated}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Maße 
                                </Typography>
                                <Typography component="span">
                                    {this.props.painting.dimensions}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Objektname
                                </Typography>
                                <Typography component="span">
                                    {this.props.painting.objectName}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Standort
                                </Typography>
                                <Typography component="span">
                                    {this.props.painting.locations[0].term}
                                </Typography>
                                <Divider />
                                <Typography variant="h6" component="h6">
                                    Herkunft
                                </Typography>
                                <Typography component="span">
                                    {this.props.painting.provenance}
                                </Typography>
                                <Divider />
                            </div>
                            
                        </Paper>
                    </Grid>
                </Grid>
                {console.log("Details: ", this.props.painting, this.props.painting.images.sizes.xs.src)}
            </div>
        );
    }
}

