import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import FilterListIcon from '@material-ui/icons/FilterList';
import Link from "@material-ui/core/Link";
//import axios from "axios";
import {/*Route, Switch,*/ useHistory} from "react-router-dom";
import FilterDrawer from "../paintinglist/FilterDrawer";
import classNames from 'classnames';
import CssBaseline from "@material-ui/core/CssBaseline";


export const HeaderBar = (props) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false)
    const { classes, filter, onChange, onFilterChange } = props
    const handleSearchChange = (event) => {
        onChange(event.target.value)
        if (window.location.pathname !== '/paintings') {
            history.push('/paintings')
        }
    }
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    return (
        <AppBar position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: isOpen,
                })}
        >
            <CssBaseline />
            <Toolbar>
                {/* <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer">
                    <MenuIcon/>
                </IconButton> */}

                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                    <Link href="/" style={{color:'white'}}>
                        Cranach Digital Archive
                    </Link>
                </Typography>
                {/*** Search Box ***/}
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon/>
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            input: classes.inputInput,
                            root: classes.inputRoot,
                        }}
                        inputProps={{'aria-label': 'search'}}
                        onChange={handleSearchChange}
                    />
                </div>
                {/*** End Search Box ***/}
                {/*** Filter ***/}
                {!isOpen && <FilterListIcon
                    className={classNames(classes.menuButton, isOpen && classes.hide)}
                    onClick={toggle}
                />}
                <FilterDrawer isOpen={isOpen} classes={classes} toggle={toggle} onFilterChange={onFilterChange} filter={filter}/>
                {/*** End Filter ***/}
            </Toolbar>
        </AppBar>
    );
}