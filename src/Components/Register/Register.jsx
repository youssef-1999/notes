import React, { useState } from "react";
import forms from "./forms.svg";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Register() {
  let [errorMsg,setErrorMsg]=useState('')
  let navigate=useNavigate()
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(4, "at least 4 characters")
      .max(20, "at most 20 characters")
      .required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8, "At least 8 characters").max(20, "At most 20 characters")
            .matches(/^[A-Za-z0-9]{8,20}$/, "Password should be alphanumeric and between 8-20 characters").required("Password is required"),
      phone: yup.string().matches(/^01[125][0-9]{8}$/, "Invalid Egyptian phone number").required("Phone number is required"),
      age: yup
      .number()
      .min(15, "too young")
      .max(60, "too old")
      .required("Age is required"),
  });
  async function onSubmit(values) {
    try {
      const response = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', values, {
      });
      console.log(response?.data?.msg);
      if(response?.data?.msg)
        {
            navigate('/login')
        }
    } catch (error) {
      console.error(error?.response?.data?.msg);
      setErrorMsg(error?.response?.data?.msg);

    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    onSubmit,
    validationSchema,
  });

  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 mt-4">
            <img src={forms} className="w-100" alt="" />
          </div>
          <div className="col-md-6 mt-4">
            {<p className="text-danger">{errorMsg}</p>}
            <h1>Register</h1>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    onBlur={formik.handleBlur}
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.name && formik.touched.name && (
                    <p className="text-danger">{formik.errors.name}</p>
                  )}
                </Form.Group>

                <Form.Group
                  as={Col}
                  md="4"
                  controlId="validationCustomUsername"
                >
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      aria-describedby="inputGroupPrepend"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email && (
                      <p className="text-danger">{formik.errors.email}</p>
                    )}
                  </InputGroup>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="******"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="text-danger">{formik.errors.password}</p>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="24"
                    name="age"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.age && formik.touched.age && (
                    <p className="text-danger">{formik.errors.age}</p>
                  )}
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="0123456789"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.phone && formik.touched.phone && (
                    <p className="text-danger">{formik.errors.phone}</p>
                  )}
                </Form.Group>
              </Row>

              <Button type="submit">Register</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
