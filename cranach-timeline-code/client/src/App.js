import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {ThemeProvider} from '@material-ui/core/styles';

//Style Components
import './style/main.style.css';

//Cofig Components
import {theme} from './config/theme.config';
import {useStyles} from './config/usestyles.config';

//Html components
import Timeline from './components/timeline/timeline.component';
import {Copyright} from './components/copyright/copyright.component';
import {HeaderBar} from './components/appbar/appbar.component';
import {Videoplayer} from './components/videoplayer/videoplayer.component';


const cards = [1, 2, 3];

function MainApp() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HeaderBar name={classes} />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            {/*** Timeline Container ***/}
            <Container maxWidth="lg">
              <Timeline />
            </Container>
            {/*** Timeline End ***/}
            {/*** PromoVideo Container ***/}
            <Container maxWidth="lg">
                <Typography variant="h3" align="center" className="title-spacing-top">
                  Besichtigung des Lucas Cranach Museums
                </Typography>
                <Typography variant="h4" align="center" className="title-spacing-bottom" gutterBottom>
                  Die größte Online-Bibliothek zu Werken von Lucas Cranach
                </Typography>
              <Videoplayer url="https://www.youtube.com/watch?v=TzTFQqZVL5I"/>
            </Container>
            {/*** PromoVideo End ***/}
          </div>

          <Typography variant="h3" align="center" className="title-spacing-top">
            Kategorien
          </Typography>
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Heading
                      </Typography>
                      <Typography>
                        This is a media card. You can use this section to describe the content.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
          </Typography>
          <Copyright />
        </footer>
        {/* End footer */}
      </ThemeProvider>
    </React.Fragment>
  );
}

export default MainApp;