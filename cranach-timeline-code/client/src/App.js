import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {ThemeProvider} from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


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
import {MediaCard} from './components/mediacard/mediacard.component';


const cards = [
  {
    title: "ENTDECKE DIE GEMÄLDE",
    index: 1
  },
  {
    title: "ARCHIVALIEN",
    index: 2
  },
  {
    title: "LITERATUR",
    index: 3
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
            <Route path="/graphics">
            {/* Graphics listing component goes here */}
            </Route>
            <Route path="/">
              {/* Hero unit */}
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
              <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                  {cards.map((card) => (
                      <MediaCard value={card} />
                  ))}
                </Grid>
              </Container>
            </Route>
          </Switch>
        </main>
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