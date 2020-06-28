import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

export const SearchBox = (props) => {
    return(
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
              inputProps={{ 'aria-label': 'search' }}/>
        </div>
    );
}