import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import axios from "axios";
import {Switch, useHistory} from "react-router-dom";



export const HeaderBar = (props) => {
    const history = useHistory();
    const handleSearchChange = (event) => {
        props.onChange(event.target.value)
        if (window.location.pathname !== '/paintings'){
            history.push('/paintings')
        }
    }
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
                {/*** Search Box ***/}
                <div className={props.classes.search}>
                    <div className={props.classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            input: props.classes.inputInput,
                            root: props.classes.inputRoot,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleSearchChange}
                    />
                </div>
                {/*** End Search Box ***/}
            </Toolbar>
        </AppBar>
    );
}