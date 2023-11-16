import React, { useContext} from 'react'
import { MyContext } from '../context';
import "./searchBar.css"

const SearchBar = () => {
    const {search, setSearch,} = useContext(MyContext);
    const handleChangesearch = (e)=>{
        setSearch(e.target.value);
    }

  return (
    <div className='searchbox'>
      <input type="text" name="" id="srch" placeholder='Search by Name , Role or Email' value={search} onChange={(e)=> handleChangesearch(e)}/>
    </div>
  )
}

export default SearchBar;