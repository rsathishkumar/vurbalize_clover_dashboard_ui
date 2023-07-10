import {useEffect, useState} from 'react'
import CheckTable from "views/admin/useraccount/components/CheckTable";

const UserList = () => {

  const [tableList, setTableList] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [columnsDataCheck, setColumnsDataCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAsending, setIsAsending] = useState(false)

  useEffect(() => {
    getAllUsers({page_no: page})
  },[])

  async function sortFunction(field) {
    let asending = true;
    await setIsAsending((prevValue) => {
      asending = prevValue;
      return prevValue;
    });

    await setIsAsending(!asending)
  }

  function changePage(page_no) {
  
  }

  function getAllUsers(object) {

    fetch(`${process.env.REACT_APP_APIURL}/users_list`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(object)
     }).then(response => response.json())
     .then(data => {
      setIsLoading(false);
       setColumnsDataCheck(true)
      setTableList(data[0]['record'])
      setTotal(data[0]['total'])
     })
     .catch((error) => {
      console.error(error);
    });
  }

  function confirmDelete(userid) {

    fetch(`${process.env.REACT_APP_APIURL}/delete_user`, {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({id: userid})
     }).then(response => response.json())
     .then(data => {
      getAllUsers({page_no: page})
     })
     .catch((error) => {
      console.error(error);
    });
  }

  return (
    <div className="mt-8 grid grid-cols-1 gap-1">
        <a href="/admin/user_account">Add New User</a>
        <div>
          <CheckTable
            columnsData={columnsDataCheck}
            tableData={tableList}
            setPage={(page)=>{setPage(page);changePage(page)}}
            total={total}
            page={page}
            sortFunction={sortFunction}
            isLoading={isLoading}
            confirm_delete = {(id) => confirmDelete(id)}
          />
        </div>
      </div>
  );
};

export default UserList;
