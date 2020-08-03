import React, {useState} from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'

export const SearchBox = (props) => {
    const [searchText, setSearchText] = useState("")
    const handleChange = async (event) => {
        setSearchText(event.target.value)
        await axios.get(`http://localhost:9000/graphics/search?text=${searchText}`)
            .then((res) => {
                console.log(res)
            })
    }
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
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
            />
        </div>
    );
}