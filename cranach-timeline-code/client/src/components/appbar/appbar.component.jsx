import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {SearchBox} from '.././searchbox/searchbox.component';

export const HeaderBar = (props) => {
    console.log("Props"+JSON.stringify(props));
    return(
        <AppBar position="relative">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={props.classes.menuButton}
                    color="inherit"
                    aria-label="open drawer">
                    <MenuIcon />
                </IconButton>
                <Typography className={props.classes.title} variant="h6" color="inherit" noWrap>
                   Cranach Digital Archive
                </Typography>
                <SearchBox classes={props.classes} />
            </Toolbar>
        </AppBar>
    );
}