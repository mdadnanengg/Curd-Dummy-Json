import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function ViewUser() {
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  // console.log(id)
  useEffect(() => {

    axios
    .get(`http://localhost:4000/users/${id}`)
    .then((res) => { setUserData(res.data) })
    .catch((err) => alert(err));

  },[id]);

  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };

  console.log(userData);

  return (
    <div>
      <h1
        style={{
          backgroundColor: "#7e57c2",
          height: "70px",
          margin: "7px 7px 0px 7px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        User Details
      </h1>
      <div style={{ margin: "0px 7px 0px 7px" }}>
        <Table striped bordered hover>
          <thead style={{ backgroundColor: "#616161" }}>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{userData.name}</td>
              <td>{userData.age}</td>
              <td>{userData.address}</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Button variant="primary" onClick={handleBackToHome} style={{ width: '200px'}}>
        Back to Home
      </Button>
    </div>
  );
}

export default ViewUser;
