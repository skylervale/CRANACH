import React, {useState, useRef, useEffect} from 'react';
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
//Import Menu
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Switch from "@material-ui/core/Switch";


export const HeaderBar = (props) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const { classes, filter, setSearchText, onFilterChange, colorSwitch, darkState, displayAlt} = props;
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    /*const handleSearchChange = (event) => {
        onChange(event.target.value)
    }*/

    const handleSearchChange = (event) => {
        setSearchText(event.target.value)
        console.log("searchText", event.target.value)
        if(history.location.pathname == '/'){
          //Check also selected timeline option and redirect to the corespondant path
          var newPath = localStorage.getItem('timelineContent') || "graphics"
          history.push("/"+newPath);
        }
    }
    const toggle = () => {
        setIsOpen(!isOpen)
    }

    //MENU
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        console.log("handleClose Ev:", event);
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };
    const handlePaintLink = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
        history.push("/paintings");
    };
    const handleGraphLink = (event) => {
        console.log("handleClose Ev:", event);
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
        history.push("/graphics");
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
          event.preventDefault();
          setOpen(false);
        }
    }
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);
    const {pathname} = history.location
    const allowedFilterPaths = ["/paintings", "/graphics"]
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
                {/**window.location.pathname !== '/' &&**/
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
                </div>}
                <div className={classes.grow} />
                {/*** End Search Box ***/}
                <div>
                    <Button href="/">
                        <span className={classes.menuBut}>Startseite</span>
                    </Button>
                    <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    >
                     <span className={classes.menuBut}>Kategorien</span>
                    </Button>
                    <Button target="_blank" href="https://lucascranach.org/">
                        <span className={classes.menuBut}>Blog</span>
                    </Button>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                <MenuItem onClick={handlePaintLink}>Gemälde</MenuItem>
                                <MenuItem onClick={handleGraphLink}>Grafiken</MenuItem>
                            </MenuList>
                            </ClickAwayListener>
                        </Paper>
                        </Grow>
                    )}
                    </Popper>
                    <Switch checked={darkState} onChange={colorSwitch} title={displayAlt} />
                </div>

                {/*** Filter ***/}
                {!isOpen && (allowedFilterPaths.indexOf(pathname) > -1) && <FilterListIcon
                    className={classNames(classes.menuButton, isOpen && classes.hide)}
                    onClick={toggle}
                />}
                <FilterDrawer isOpen={isOpen} classes={classes} toggle={toggle} onFilterChange={onFilterChange} filter={filter}/>
                {/*** End Filter ***/}
            </Toolbar>
        </AppBar>
    );
}