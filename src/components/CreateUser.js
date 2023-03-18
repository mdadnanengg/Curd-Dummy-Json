import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { v4 as uuid } from 'uuid';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function CreateUser() {
  const [formData, setFormData] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate()
  const onSubmit = (data) => {
    setFormData(data)
    // console.log(data)
    // axios
    //   .post("http://localhost:4000/users", { ...formData, id: uuid() })
    //   .then((() => navigate("/"))
    axios.post("http://localhost:4000/users", {...data,id:uuid()}).then(()=>{navigate("/")})
  }

  // console.log(register().required)
  console.log(formData)


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
        >Create User</h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="m-2" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name *"
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
              placeholder="Age *"
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
              placeholder="Address *"
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
          <Button variant="primary" type="submit" >
            Submit
          </Button>
        </Form>
    </>
  );
}

export default CreateUser;
