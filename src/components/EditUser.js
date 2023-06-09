import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";



function EditUser() {
  const [editData, setEditData] = useState({});
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const navigate = useNavigate()
  const onSubmit = (data) => {
        setEditData(data)
        axios
        .patch(`http://localhost:4000/users/${id}`, data)
        .then(()=>navigate("/"))
     
  }
  const {id} = useParams()
  useEffect(()=>{
    axios
        .get(`http://localhost:4000/users/${id}`)
        .then((res) => { setEditData(res.data) })
        .catch((err) => alert(err));
  }, [id])

  useEffect(()=>{
    reset(editData)
  },[editData])

  // console.log(register().required)
  // console.log(editData)

  const backToHome = () => {
    navigate("/")
  }

  return (
    <>
        <h1
        style={{
          backgroundColor: "#66bb6a",
          height: "70px",
          margin: "7px 7px 0px 7px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }} 
        >Edit User</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="m-2" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter your name"
              {...register("name", {
                required: {
                  value: true,
                  message: "This field is required",
                },
                minLength: {
                  value: 3,
                  message: "character length not less then 3",
                },
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Wrong Input Taken Please Type Correct Input"
                }
              })}
            />
            <Form.Text className="text-danger">
              {errors.name && <span>{errors.name?.message}</span>}
            </Form.Text>
            <br />
            <Form.Label className="mt-1">Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter your age"
              {...register("age", {
                required: { value: true, message: "This field is required" },
                min: {
                  value: 18,
                  message: "age not be less than 18",
                },
                max: {
                  value: 99,
                  message: "age not be grater than 99",
                },
                pattern: {
                  value: /^\S[0-9]{0,3}$/,
                  message: "Invalid Input please type Correct"
                }
              })}
            />
            <Form.Text className="text-danger">
              {errors.age && <span>{errors.age?.message}</span>}
            </Form.Text>
            <br />
            <Form.Label className="mt-1">Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter your address"
              {...register("address", {
                required: {
                  value: true,
                  message: "This field is required",
                },
                maxLength: {
                  value: 20,
                  message: "character length not grater then 20",
                },
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Wrong Input Taken Please Type Correct Input"
                }
              })}
            />
            <Form.Text className="text-danger">
              {errors.address && <span>{errors.address?.message}</span>}
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" style={{ width: '200px', marginTop:"10px", marginBottom:'20px' }}>
            Update
          </Button>
          <br/>
          <Button variant="primary" onClick={backToHome}>
            Back to Home
          </Button>
        </Form>
    </>
  );
}

export default EditUser;
