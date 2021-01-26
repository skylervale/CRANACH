import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export const Copyright = (props) => {
    return(
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://lucascranach.org/">
            Lucas Cranach Digital Archive
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
    )
    
};