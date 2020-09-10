import React, {useEffect} from "react";
import Drawer from "@material-ui/core/Drawer";
import Slider from '@material-ui/core/Slider';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import _ from 'lodash'
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import ListSubheader from "@material-ui/core/ListSubheader";
import axios from 'axios'
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const FilterDrawer = (props) => {
    const { isOpen, classes, toggle, filter, onFilterChange} = props
    const [classifications, setClassifications] = React.useState([]);
    const [yearRange, setYearRange] = React.useState([1500, 1550]);
    useEffect(() => {
        axios.get(`http://localhost:9000/graphics/classifications`)
            .then(res => {
                setClassifications(res.data)
            })
    },[])
    const handleYearChange = (event, newValue) => {
        const newFilter = {
                ...filter,
                yearRange: newValue
        }
        console.log("newFilter", newFilter)
        onFilterChange(newFilter)
    }

    const handleClassificationChange = (event) => {
        const newFilter = {
                ...filter,
                classification: event.target.value
            }
        onFilterChange(newFilter)
    }
    console.log("filter", filter)
    return (
    <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={isOpen}
        classes={{
            paper: classes.drawerPaper,
        }}
    >
        <div className={classes.drawerHeader}>
            <IconButton onClick={() => toggle()}>
                <ChevronRightIcon />
            </IconButton>
            Filter
        </div>
        <Divider/>
        <Container aligncontent={"center"}>
            <Typography id="range-slider" align="center">
                Year Range <br/> {filter.yearRange}
            </Typography>
                <Slider
                    value={filter.yearRange}
                    min={1500}
                    max={1550}
                    step={1}
                    onChange={handleYearChange}
                    aria-labelledby="range-slider"
                    valueLabelDisplay="auto"
                />
        </Container>
        <Divider/>
        <FormControl className={classes.formControl} fullWidth={false}>
            <InputLabel id="demo-simple-select-helper-label">Classification</InputLabel>
            <Select
                name="classification"
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                onChange={handleClassificationChange}
                defaultValue="none"
            >
                {classifications.map((classification, index) => classification && <MenuItem key={index} value={classification}>{classification}</MenuItem>)
                }
            </Select>
        </FormControl>
        {/*<FormControl className={classes.formControl}>*/}
        {/*    <InputLabel htmlFor="grouped-select">Grouping</InputLabel>*/}
        {/*    <Select defaultValue="" id="grouped-select">*/}
        {/*        <MenuItem value="">*/}
        {/*            <em>None</em>*/}
        {/*        </MenuItem>*/}
        {/*        <ListSubheader>Category 1</ListSubheader>*/}
        {/*        <MenuItem value={1}>Option 1</MenuItem>*/}
        {/*        <MenuItem value={2}>Option 2</MenuItem>*/}
        {/*        <ListSubheader>Category 2</ListSubheader>*/}
        {/*        <MenuItem value={3}>Option 3</MenuItem>*/}
        {/*        <MenuItem value={4}>Option 4</MenuItem>*/}
        {/*    </Select>*/}
        {/*</FormControl>*/}
    </Drawer>

            )
}

export default FilterDrawer





// import React from 'react';
// import classNames from 'classnames';
// import { makeStyles, useTheme } from '@material-ui/styles';
// import Drawer from '@material-ui/core/Drawer';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import List from '@material-ui/core/List';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
//
// const drawerWidth = 240;
//
// const useStyles = makeStyles(theme => ({
//
//     drawer: {
//         width: drawerWidth,
//         flexShrink: 0,
//     },
//     drawerPaper: {
//         width: drawerWidth,
//     },
//     drawerHeader: {
//         display: 'flex',
//         alignItems: 'center',
//         padding: '0 8px',
//         ...theme.mixins.toolbar,
//         justifyContent: 'flex-start',
//     },
//     content: {
//         flexGrow: 1,
//         padding: theme.spacing.unit * 3,
//         transition: theme.transitions.create('margin', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//         }),
//         marginRight: -drawerWidth,
//     },
//     contentShift: {
//         transition: theme.transitions.create('margin', {
//             easing: theme.transitions.easing.easeOut,
//             duration: theme.transitions.duration.enteringScreen,
//         }),
//         marginRight: 0,
//     },
// }));
//
// function PersistentDrawerRight() {
//     const classes = useStyles();
//     const theme = useTheme();
//     const [open, setOpen] = React.useState(false);
//
//     function handleDrawerOpen() {
//         setOpen(true);
//     }
//
//     function handleDrawerClose() {
//         setOpen(false);
//     }
//
//     return (
//         <div className={classes.root}>
//             <CssBaseline />
//             <AppBar
//                 position="fixed"
//                 className={classNames(classes.appBar, {
//                     [classes.appBarShift]: open,
//                 })}
//             >
//                 <Toolbar disableGutters={!open}>
//                     <IconButton
//                         color="inherit"
//                         aria-label="Open drawer"
//                         onClick={handleDrawerOpen}
//                         className={classNames(classes.menuButton, open && classes.hide)}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography variant="h6" color="inherit" noWrap>
//                         Persistent drawer
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <Drawer
//                 className={classes.drawer}
//                 variant="persistent"
//                 anchor="right"
//                 open={open}
//                 classes={{
//                     paper: classes.drawerPaper,
//                 }}
//             >
//
//             </Drawer>
//         </div>
//     );
// }
//
// export default PersistentDrawerRight;
