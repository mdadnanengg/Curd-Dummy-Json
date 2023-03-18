import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getAllUser } from '../../ApiService'
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

function Home() {

  const [userData, setUserData] = useState([])
  const [refetch, setRefetch] = useState([])

  // getAllUser().then((data)=>{console.log(data)})

  useEffect(() => {
    // axios.get("http://localhost:4000/users")
    getAllUser().then((data) => { setUserData(data) }).catch((err) => alert(err));
    // console.log(data)
  }, [refetch])

  const navigate = useNavigate()
  const handleAddUser = () => {
    navigate("/create-user")
  }
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/users/${id}`)
      .then(() => {
        setRefetch(!refetch ? true : false);
        console.log(!refetch);
        alert("User deleted succesfully");
      })
      .catch(() => alert("Something went wrong"));
  }

  const handleView = (id) => {
    navigate(`/users/${id}`)
  }
  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  }
  
  return (
    <>
    <div style={{backgroundColor: "#ffa726" , height:"70px", margin:"7px 7px 0px 7px", display:"flex", alignItems:"center", justifyContent:"center"}}>
      <h1>User List</h1>
    </div>
        <br />
        <div style={{display:"flex", justifyContent:"flex-end", marginRight:"17px"}}><Button variant="primary" onClick={handleAddUser} >Add User</Button></div>
        <br />
        <div style={{margin:"7px"}}>
        <Table striped bordered hover>
          <thead style={{ backgroundColor: "#616161"}}>
            <tr>
              <th>Sr No</th>
              <th>User Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((value, index) => {
              return <tr key={index}>
                <td>{index + 1}</td>
                <td>{value.name}</td>
                <td>{value.age}</td>
                <td>{value.address}</td>
                <td>
                  <Button variant="light" style={{marginRight:"10px"}} onClick={() => {handleView(value.id);}}> <FaEye /> </Button> {' '}
                  <Button variant="warning" style={{marginRight:"10px"}} onClick={() => {handleEdit(value.id);}}> <FaEdit /> </Button> {' '}
                  <Button variant="danger" onClick={() => {handleDelete(value.id);}}> <FaTrash /> </Button>
                </td>
              </tr>
            })}
          </tbody>
        </Table>
        </div>
    </>
  )
}

export default Home