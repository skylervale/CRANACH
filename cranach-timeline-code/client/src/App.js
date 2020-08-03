import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {ThemeProvider} from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


//Style Components
import './style/main.style.css';

//Cofig Components
import {theme} from './config/theme.config';
import {useStyles} from './config/usestyles.config';

//Html components
import Timeline from './components/timeline/timeline.component';
import Paintinglist from './components/paintinglist/paintinglist.component';
import {Copyright} from './components/copyright/copyright.component';
import {HeaderBar} from './components/appbar/appbar.component';
import {Videoplayer} from './components/videoplayer/videoplayer.component';
import {MediaCard} from './components/mediacard/mediacard.component';

//images
import gemaldeimg from './images/gemalde.jpg';
import archivalienimg from './images/archivalien.jpg';
import literaturimg from './images/literature.jpg';


const cards = [
  {
    title: "ENTDECKE DIE GEMÄLDE",
    index: 1,
    image: gemaldeimg,
    link: "/paintings"
  },
  {
    title: "ARCHIVALIEN",
    index: 2,
    image: archivalienimg,
    link: "#"
  },
  {
    title: "LITERATUR",
    index: 3,
    image: literaturimg,
    link: "#"
  }
];

function MainApp() {
  const classes = useStyles();
  return (
     <Router>
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <HeaderBar classes={classes} />
        </div>
        <main>
          <Switch>

            {/*** PAINTINGS PAGE ***/}
            <Route path="/paintings">
              <Container maxWidth="lg">
                  <Typography variant="h3" align="center" className="title-spacing-top">
                    Entdecke die Gemälde
                  </Typography>
                  <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}></Grid>
                    <Paintinglist value={classes} />
                  </Container>
              </Container>
              
            </Route>
            {/*** END PAINTINGS PAGE ***/}

            {/*** LANDING PAGE ***/}
            <Route path="/">
              <div className={classes.heroContent}>
                {/*** Timeline Container ***/}
                <Container maxWidth="lg">
                  <Timeline />
                </Container>
                {/*** Timeline End ***/}
              </div>
              {/*** PromoVideo Container ***/}
              <Container maxWidth="lg">
                <Typography variant="h3" align="center" className="title-spacing-top">
                  Besichtigung des Lucas Cranach Museums
                </Typography>
                <Typography variant="h6" align="center" className="title-spacing-bottom" gutterBottom>
                  Die größte Online-Bibliothek zu Werken von Lucas Cranach
                </Typography>
                <Videoplayer url="https://www.youtube.com/watch?v=TzTFQqZVL5I"/>
              </Container>
              {/*** PromoVideo End ***/}
              <Typography variant="h3" align="center" className="title-spacing-top">
                Kategorien
              </Typography>
            </Route>
            {/*** END LANDING PAGE ***/}
            
          </Switch>
        </main>
        {/* Categories Nav */}
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
                <MediaCard key={card.index} value={card} />
            ))}
          </Grid>
        </Container>
        {/* END Categories Nav */}
        {/* Footer */}
        <footer className={classes.footer}>
          <Copyright />
        </footer>
        {/* End footer */}
      </ThemeProvider>
    </React.Fragment>
     </Router>
  );
}

export default MainApp;