import React from 'react';
import { Formik, Form } from "formik";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import { Mutation } from "react-apollo"
import gql from "graphql-tag"

import { loginValidation } from "./validationSchemas"

const LOG_IN_MUTATION = gql`
  mutation loginMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      message
    }
  }
`

function LoginForm (props) {
  return (
    <div id = "login">
    <br />
    <Mutation
      mutation = {LOG_IN_MUTATION}
      onError = {(error) => {
        console.log(error)
      }}
      onCompleted = {(data) => {
        console.log("Data: ", data)
        props.history.push("/home")
      }}
    >

    { (logIn, {data}) => (
      <Formik
             initialValues = {{ email: "", password: ""}}
             onSubmit={(values, {setSubmitting}) => {
               logIn({variables: {
                email: values.email,
                password: values.password
               }
               })
               setSubmitting(false)
               alert(JSON.stringify(values, null, 2))
             }}
             validationSchema = {
               loginValidation
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

                 return (
                   <Form className = "form" onSubmit={handleSubmit}>
                     <h1> Login </h1>
                     <TextField
                     required
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
                     required
                     error={errors.password && touched.password}
                     id = "password"
                     label = {errors.password && touched.password ? "Password is required!" : "Password"}
                     value = {values.password}
                     className = "login-password"
                     onChange = {handleChange}
                     onBlur = {handleBlur}
                     type = "password"
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
          )
      }
    </Mutation>
    </div>
    )
}

export default LoginForm