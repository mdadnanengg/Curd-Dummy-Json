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
      <center>
        <h1 className="mt-4">Create User</h1>
        <Form className="w-50" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
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
              })}
            />
            <Form.Text className="text-danger">
              {errors.name && <span>{errors.name?.message}</span>}
            </Form.Text>
            <br />
            <Form.Label className="mt-2">Age</Form.Label>
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
              })}
            />
            <Form.Text className="text-danger">
              {errors.age && <span>{errors.age?.message}</span>}
            </Form.Text>
            <br />
            <Form.Label className="mt-2">Address</Form.Label>
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
              })}
            />
            <Form.Text className="text-danger">
              {errors.address && <span>{errors.address?.message}</span>}
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </center>
    </>
  );
}

export default CreateUser;
