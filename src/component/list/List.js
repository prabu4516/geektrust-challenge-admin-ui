import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context';
import "./list.css"

const List = () => {
    const {
        search, setSearch,
        data, setData,
        currPage, setCurrpage,
        checked, setChecked,
        isSelectAll, setSelectAll,
        filterD, setFilterD,
        userPerPage,
    } = useContext(MyContext);




    
    /*
    editing stores the data object which is currently being edited in the list
    editName is a state storing the values that user has edited
    editEmail is storing the changed email 
    editRole is storing the new role given to user
    */
    const [editing, setEditing] = useState({});
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editRole, setEditRole] = useState("");





//  handleCheck function manages the check and uncheck process and add or remove  the current object from checked list 
    const handleCheck = (e, id) => {
        setSelectAll(false);
        if (e.target.checked) {
            setChecked([...checked, id]);
        } else {
            setChecked(checked.filter((i) => i !== id));
        }
    }


    // handleEdit function toggles the data field between data and input field to be edited
    const handleEdit = (id) => {
        setEditing({ [id]: true });
        const index = data.findIndex((e) => e.id === id);
        setEditName(data[index].name);
        setEditEmail(data[index].email);
        setEditRole(data[index].role);
    }


    // handleSave function search the current user from the data list and changes its values to new values provided by user
    const handleSave = (id) => {
        const changingData = [...data];
        const index = data.findIndex((e) => e.id === id);

        changingData[index].name = editName;
        changingData[index].email = editEmail;
        changingData[index].role = editRole;
        setData(changingData);
        setFilterD(changingData);
        setEditing({ [id]: false });

        setEditName("");
        setEditEmail("");
        setEditRole("");

        filterDataList();
    }


    // filterDataList function searches for the given input in name, email or role
    const filterDataList = () => {
        let user = data.filter((cUser)=>{
          return(
              cUser.name.toLowerCase().search(search) !== -1||
              cUser.email.toLowerCase().search(search) !== -1 ||
              cUser.role.toLowerCase().search(search) !== -1
          );
      })
      setFilterD(user);
    }

    useEffect(() => {
        filterDataList();
    }, [search]);



    // handleDelete deletes the current user from the data list
    const handleDelete = (id)=>{
        const changeData = data.filter((e)=> e.id !== id);
        const changeFilterD = filterD.filter((e)=> e.id !== id);
        setFilterD(changeFilterD);
        setData(changeData);
    }


    // delMultipleuser function deletes all selected users present in checked list
    const delMultipleuser = (id)=>{
        const Filterdata = filterD.filter((e)=>
        !checked.includes(e.id));

        setFilterD(Filterdata);
        const dataFiltered = data.filter((e) => !checked.includes(e.id));
        setData(dataFiltered);
        setSelectAll(false);
        // setCurrpage(Math.ceil(filterD.length / userPerPage));
    }


    // handlecheckAll manages the working for select all button on table head
    const handlecheckAll = (e)=>{
        setSelectAll(!isSelectAll);
        if(e.target.checked){
            const newData = filterD.slice(  currPage * userPerPage -userPerPage,currPage * userPerPage);
            const checkedData = newData.map((user) => user.id);
            setChecked(checkedData);
        }else{
            setChecked([]);
        }

    }

    useEffect(()=>{
        setCurrpage(1);
    }, [search]);




    return (
        <div className='container'>
            <div className="box">
            
            <table>
                <thead className='underline'>

                    <tr>
                        <th><input type="checkbox" name="" id="" onClick={(e) => handlecheckAll(e)}/></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterD.slice(currPage * userPerPage - userPerPage, currPage * userPerPage).map((user, index) => (
                            <>
                                <tr
                                    key={user.id}
                                    className={
                                        checked.includes(user.id) ? "checked": "unchecked"
                                    }
                                >
                                    <td>
                                        <input type="checkbox" name={user.name}
                                            checked={checked.includes(user.id)}
                                            onChange={(e) => {
                                                handleCheck(e, user.id);
                                            }}
                                        />
                                    </td>
                                    <td>
                                        {
                                            editing[user.id] ? (
                                                <input type="text" id="" class="input"
                                                    value={editName}
                                                    onChange={(e) => { setEditName(e.target.value) }}
                                                />
                                            ) : (
                                                <>
                                                    <span>
                                                        {user.name}
                                                    </span>
                                                </>
                                            )
                                        }
                                    </td>
                                    <td>
                                        {editing[user.id] ? (
                                            <input type="text" label="email" id="" class="input"  value={editEmail}
                                                onChange={(e) => {
                                                    setEditEmail(e.target.value);
                                                }}
                                            />
                                        ) : (
                                            <>
                                                {user.email}
                                            </>
                                        )
                                        }
                                    </td>

                                    <td>
                                        {
                                            editing[user.id] ? (
                                                <input type="text" name=""  class="input" value={editRole}
                                                    onChange={(e) => {
                                                        setEditRole(e.target.value);
                                                    }} />
                                            ) : (
                                                <>
                                                    {user.role}
                                                </>
                                            )
                                        }
                                    </td>
                                    <td>
                                        {editing[user.id] ? (
                                            <span class="material-icons" onClick={() => handleSave(user.id)}>
                                                done
                                            </span>
                                        ) : (
                                            <span class="material-icons" onClick={() => handleEdit(user.id)}>
                                                edit
                                            </span>
                                        )}

                                        <span class="material-icons" onClick={()=> handleDelete(user.id)}>
                                            delete
                                        </span>
                                    </td>
                                </tr>
                            </>
                        ))
                    }
                </tbody>
            </table>
            </div>
            <span>
                <button id="del"onClick={delMultipleuser} >delete selected</button>
            </span>
        </div>
    )
}

export default List