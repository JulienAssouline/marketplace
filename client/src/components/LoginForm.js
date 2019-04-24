import React from 'react';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'

function LoginForm () {
  return (
    <div id = "login">
    <h1> Login </h1>
    <Formik
    initialValues = {{ email: "", password: ""}}
    onSubmit={(values, {setSubmitting}) => {
      setSubmitting(false)
      alert(JSON.stringify(values, null, 2))
    }}
    validationSchema = {
      Yup.object().shape({
        email: Yup.string()
          .email('Invalid email')
          .required("Email is required"),
        password: Yup.string()
          .required("password is required!")
      })
    }
    >
    {
      props => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,

        } = props;

        console.log(errors)

        return (
          <Form className = "form" onSubmit={handleSubmit}>
            <TextField
            error={errors.email && touched.email}
            id= "email"
            label= {(errors.email && touched.email) ? errors.email : "Email"}
            value = {values.email}
            className = "login-email"
            onChange={handleChange}
            onBlur = {handleBlur}
            type = "text"
            margin="normal"
            />
            <TextField
            error={errors.password && touched.password}
            id = "password"
            label = {errors.password && touched.password ? "Password is required!" : "Password"}
            value = {values.password}
            className = "login-password"
            onChange = {handleChange}
            onBlur = {handleBlur}
            type = "text"
            margin = "normal"
            />
            <br/>
            <Button
            variant="contained"
            color="primary"
            className="submit_button"
            type="submit"
            margin = "normal"
            >
              Submit
            </Button>

          </Form>
          )
      }
    }

    </Formik>
    </div>
    )
}

export default LoginForm