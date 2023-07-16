import React, { useState, useEffect, useRef } from "react";
import './App.css';
import UserList from "./components/UserList";
import { fetchData } from "./services/index";
import { config } from "./config/config";
import UserPagination from "./components/UserPagination";


const App = () => {

  //userlist state
  const [users, setUserList] = useState([]);
  const [update, setChangeUpdate] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const selectAllRef = useRef(null);

  console.log(users);

  //fetch users on page load
  useEffect(() => {
    fetchData(setUserList);
  }, []);

  //search users by name,email and role
  function searchUsers(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
  
    const filteredUsers = users.filter((user) => {
      const name = user.name.toLowerCase();
      const email = user.email.toLowerCase();
      const role = user.role.toLowerCase();
  
      return (
        name.includes(searchTerm) ||
        email.includes(searchTerm) ||
        role.includes(searchTerm)
      );
    });
  
    return filteredUsers;
  };

  //delete user by id
  function deleteUser(id) {
    users = users.filter(user => user.id !== userId);
  }
  //dUser();

  //edit user by id
  const editUser = (id) => {
    let tempUsers = users;
    let index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].edit = true;
    setUserList(tempUsers);
    setChangeUpdate((prevState) => !prevState);

  };
  
  //eUser()

  //save user data
  const saveUser = (id, nameEl, emailEl, roleEl) => {
    let tempUsers = users;
    let index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].name = nameEl.current.value;
    tempUsers[index].email = emailEl.current.value;
    tempUsers[index].role = roleEl.current.value;
    tempUsers[index].edit = false;
    setUserList(tempUsers);
    setChangeUpdate((prevState) => !prevState);

  };

  const checkOne = (id) => {
    const tempUserList = users;
    let idx = tempUserList.findIndex((user) => user.id === id);
    tempUserList[idx].isChecked = !tempUserList[idx].isChecked;
    setUserList(tempUserList);
    setChangeUpdate((prevState) => !prevState);
  };


  const selectAllCheckbox = (event) => {
    let listedUserIds = users
      .filter((user) => user.show)
      .slice(ind, ind + config.page_size)
      .map((user) => user.id);

    let tempUserList = users.map((user) => {
      if (listedUserIds.includes(user.id)) {
        user.isChecked = event.target.checked;
        return user;
      }
      return user;
    });

    setUserList(tempUserList);
    setChangeUpdate(!update);

  };

  function deleteSelected(selectedItems) {
    items = items.filter(item => !selectedItems.includes(item));
  };
  
  let ind = (currentPage - 1) * 10;
  return (
    <div className="App">
      <input
        className="search"
        type="text"
        placeholder="Search by name, email or role"
        onChange={searchUsers}
      />
      <UserList
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        selectAllCheckbox={selectAllCheckbox}
        selectAllRef={selectAllRef}
        checkOne={checkOne}
        saveUser={saveUser}
        editUser={editUser}
        deleteUser={deleteUser}
        users={users
          .filter((user) => user.show)
          .slice(ind, ind + config.page_size)}
      />
      <UserPagination
        usersLength={users.filter((user) => user.show).length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        deleteSelected={deleteSelected}
      />
    </div>
  );
}

export default App;