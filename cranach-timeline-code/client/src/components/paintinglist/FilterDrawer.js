import React, {useEffect, useState} from "react";
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
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import {useHistory} from "react-router-dom";


const FilterDrawer = (props) => {
    const { isOpen, classes, toggle, filter, onFilterChange} = props
    const [filterData, setFilterData] = useState([]);
    const history =  useHistory();
    const {pathname} = history.location
    useEffect(() => {
        axios.get(`http://localhost:9000${pathname}/getFilters`)     // pathname already contains slash (ex "/paintings", "/graphics")
            .then(res => {
                console.log("res", res)
                setFilterData(res.data)
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

    const handleFilterSelectChange = (event) => {
        console.log("tar5et", event.target)
        const newFilter = {
                ...filter,
            [event.target.name]: event.target.value
            }
        onFilterChange(newFilter)
        console.log("newFilter", newFilter)

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
                onChange={handleFilterSelectChange}
                defaultValue="none"
            >
                {filterData && filterData.classifications && filterData.classifications.map((classification, index) =>
                    filterData.classifications && <MenuItem key={index} value={classification}>{classification}</MenuItem>)
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

        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Künstler</InputLabel>
            <Select
                name="artists"
                labelId="demo-mutiple-checkbox-label"
                id="demo-mutiple-checkbox"
                multiple
                value={filter.artists ? filter.artists : []}
                onChange={handleFilterSelectChange}
                input={<Input />}
                renderValue={(selected) => selected.join(', ')}
                // MenuProps={MenuProps}
            >
                {filterData.artists && filterData.artists.map((artist, index) =>
                    <MenuItem key={index} value={artist}>
                        <Checkbox checked={filter.artists && filter.artists.indexOf(artist) > -1} />
                        <ListItemText primary={artist} />
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    </Drawer>

            )
}

export default FilterDrawer