import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export const HeaderBar = (props) => {
    return(
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                   Cranach Digital Archive
                </Typography>
            </Toolbar>
        </AppBar>
    );
}