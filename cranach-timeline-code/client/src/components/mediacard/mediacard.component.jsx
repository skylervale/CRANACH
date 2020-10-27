import React from 'react';
import {useStyles} from '../../config/usestyles.config';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export const MediaCard = (card) => {
    const classes = useStyles();
    return(
        <Grid item key={card.value.index} xs={12} sm={6} md={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={card.value.image}
              title={card.value.title}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {card.value.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" href={card.value.link}>
                Mehr
              </Button>
            </CardActions>
          </Card>
        </Grid>
    );
} 