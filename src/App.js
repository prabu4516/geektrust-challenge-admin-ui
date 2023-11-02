import React, { useState, useEffect, useRef } from "react";
import { MyContext } from "./component/context";
import SearchBar from "./component/search/SearchBar";
import List from "./component/list/List";
import Pagination from "./component/pagination/Pagination";
import axios from 'axios';


import "./App.css"
function App() {

  //  data : list of user revieved from api
  //  filterD: list of user after filtering it
  //  currPage: variable to store the current page number
  // isSelectAll : stores either select all button is checked or not
  // checked: array stores the checked object
  // search: search bar values are stored here
  // userPerPage: number of user needed in a single page

  const [data, setData] = useState([]);
  const [filterD, setFilterD] = useState([]);
  const [currPage, setCurrpage] = useState(1);
  const [isSelectAll, setSelectAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const [search, setSearch] = useState("");
  const userPerPage = 10;
  const URL = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';


  // fetch function fetches the data from the server and stores it in data variable
  const fetch = async () => {
    let res = await axios.get(URL);
    setData(res.data);
    setFilterD(res.data);
}

useEffect(() => {
    fetch();
}, [])

return (
    <MyContext.Provider 
    value={{
      data,setData,
      filterD, setFilterD,
      currPage, setCurrpage,
      isSelectAll, setSelectAll,
      checked, setChecked,
      search, setSearch,
      userPerPage
    }}>
      
    <div className="App">
      <SearchBar/>
      <List/>
      <Pagination/>
    </div>
    </MyContext.Provider>
  );
}

export default App;