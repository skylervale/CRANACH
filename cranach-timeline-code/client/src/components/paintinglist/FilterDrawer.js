import React, {useEffect, useState} from "react";
import Drawer from "@material-ui/core/Drawer";
import Slider from '@material-ui/core/Slider';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
//import List from "@material-ui/core/List";
//import ListItem from "@material-ui/core/ListItem";
//import _ from 'lodash'
import FormControl from "@material-ui/core/FormControl";
//import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
//import ListSubheader from "@material-ui/core/ListSubheader";
import axios from 'axios'
//import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import {useHistory} from "react-router-dom";
import {path} from '../../config/env.config';
import Chip from "@material-ui/core/Chip";
//import Box from "@material-ui/core/Box";


const FilterDrawer = (props) => {
    const { isOpen, classes, toggle, filter, onFilterChange} = props
    const [filterData, setFilterData] = useState([]);

    const history =  useHistory();
    const {pathname} = history.location;

    useEffect(() => {
        if (["/graphics", "/paintings"].indexOf(pathname) > -1) {
            axios.get(`${path}${pathname}/getFilters`)     // pathname already contains slash (ex "/paintings", "/graphics")
                .then(res => {
                    console.log("res", res)
                    setFilterData(res.data)
                })
        }
    },[pathname])
    const handleYearChange = (event, newValue) => {
        const newFilter = {
                ...filter,
                yearRange: newValue
        }
        onFilterChange(newFilter)
    }

    const handleFilterSelectChange = (event) => {
        const newFilter = {
                ...filter,
            [event.target.name]: event.target.value
            }
        onFilterChange(newFilter)

    }
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
                Year Range <br/>
                <span className={classes.left}>{filter.yearRange[0]}</span>
                <span className={classes.right}>{filter.yearRange[1]}</span>
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

        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Classification</InputLabel>
            <Select
                name="classification"
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={filter.classification ? filter.classification : []}
                onChange={handleFilterSelectChange}
                input={<Input />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                // MenuProps={MenuProps}
            >
                {filterData.classifications && filterData.classifications.map((classification) =>
                    <MenuItem key={classification} value={classification}>
                        {classification}
                    </MenuItem>
                )}
            </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Künstler</InputLabel>
            <Select
                name="artists"
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={filter.artists ? filter.artists : []}
                onChange={handleFilterSelectChange}
                input={<Input />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                // MenuProps={MenuProps}
            >
                {filterData.artists && filterData.artists.map((artist) =>
                    <MenuItem key={artist} value={artist}>
                        {artist}
                    </MenuItem>
                )}
            </Select>
        </FormControl>


        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Medium</InputLabel>
            <Select
                name="mediumValues"
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={filter.mediumValues ? filter.mediumValues : []}
                onChange={handleFilterSelectChange}
                input={<Input />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                // MenuProps={MenuProps}
            >
                {filterData.mediumValues && filterData.mediumValues.map((v) =>
                    <MenuItem key={v} value={v}>
                        {v}
                    </MenuItem>
                )}
            </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Owners</InputLabel>
            <Select
                name="owners"
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={filter.owners ? filter.owners : []}
                onChange={handleFilterSelectChange}
                input={<Input />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                // MenuProps={MenuProps}
            >
                {filterData.mediumValues && filterData.owners.map((owner) =>
                    <MenuItem key={owner} value={owner}>
                        {owner}
                    </MenuItem>
                )}
            </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Locations</InputLabel>
            <Select
                name="locations"
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={filter.locations ? filter.locations : []}
                onChange={handleFilterSelectChange}
                input={<Input />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                // MenuProps={MenuProps}
            >
                {filterData.locations && filterData.locations.map((location) =>
                    <MenuItem key={location} value={location}>
                        {location}
                    </MenuItem>
                )}
            </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-checkbox-label">Repositories</InputLabel>
            <Select
                name="repositories"
                labelId="demo-mutiple-chip-label"
                id="demo-mutiple-chip"
                multiple
                value={filter.repositories ? filter.repositories : []}
                onChange={handleFilterSelectChange}
                input={<Input />}
                renderValue={(selected) => (
                    <div className={classes.chips}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} className={classes.chip} />
                        ))}
                    </div>
                )}
                // MenuProps={MenuProps}
            >
                {filterData.repositories && filterData.repositories.map((repository) =>
                    <MenuItem key={repository} value={repository}>
                        {repository}
                    </MenuItem>
                )}
            </Select>
        </FormControl>
    </Drawer>

            )
}

export default FilterDrawer
