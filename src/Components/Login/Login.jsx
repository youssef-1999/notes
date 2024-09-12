import React, { useState } from "react";
import login from "./login.svg";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Login() {
  let [errorMsg,setErrorMsg]=useState('')
  let navigate=useNavigate()
  const validationSchema = yup.object().shape({
   
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(8, "At least 8 characters").max(20, "At most 20 characters")
            .matches(/^[A-Za-z0-9]{8,20}$/, "Password should be alphanumeric and between 8-20 characters").required("Password is required"),
     
  });
  async function onSubmit(values) {
    try {
      const response = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn',values, {
      });
      console.log(response?.data?.msg);
      if(response?.data?.msg==="done")
        {
            localStorage.setItem("userToken",response?.data?.token)
            navigate('/')
        }
        console.log(response);
    } catch (error) {
      console.error(error?.response?.data?.msg);
      setErrorMsg(error?.response?.data?.msg);

    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
     
    },
    onSubmit,
    validationSchema,
  });


 

  return (
    <div>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 mt-4">
            <img src={login} className="w-100" alt="" />
          </div>
          <div className="col-md-6 mt-4">
            {<p className="text-danger">{errorMsg}</p>}
            <h1>Login</h1>
            <Form noValidate onSubmit={formik.handleSubmit}>
              <Row className="mb-3">
               

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
                      className="form-control"
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
              
              </Row>

              <Button type="submit">Login</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
