import React from 'react';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";


const SIGN_UP_MUTATION = gql`
  mutation signUpMutation($email: String!, $username: String!, $password: String!) {
     signUp(email: $email, username: $username, password: $password) {
      message
     }
   }
`

function SignupForm() {
  return(
    <div id = "signup">
    <h1> Sign Up Form </h1>
    <Mutation
      mutation = {SIGN_UP_MUTATION}
      onError={(error) => {
        console.log(error)
      }}
      onCompleted = {(data) => {
        console.log("Data: ", data)
        alert("signed up!")
      }}
    >
      { (signUp, {data}) =>(
        <Formik
            initialValues = {{ email: "", username: "",  password: "", confirmpassword: '' }}
            onSubmit={(values, {setSubmitting}) => {
              console.log(values)
                signUp({variables: {
                  email: values.email,
                  username: values.username,
                  password: values.password
                }
              })
              setSubmitting(false)
              alert(JSON.stringify(values, null, 2))
            }}
            validationSchema = {
              Yup.object().shape({
                email: Yup.string()
                  .email('Invalid email')
                  .required("Email is required!"),
                username: Yup.string(),
                password: Yup.string()
                  .required("password is required!"),
                confirmpassword: Yup.string()
                  .required("confirm password is required!")
              })
            }
            >
            {
              props => {
                const {
                  values,
                  touched,
                  errors,
                  dirty,
                  isSubmitting,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  handleReset,

                } = props;

                return (
                  <Form className = "form" onSubmit={handleSubmit}>
                      <TextField
                        id= "username"
                        label= "Username"
                        value = {values.username}
                        className = "signup-username"
                        onChange={handleChange}
                        onBlur = {handleBlur}
                        type = "text"
                        margin="normal"
                        />
                      <TextField
                        error={errors.email && touched.email}
                        id= "email"
                        label= {(errors.email && touched.email) ? errors.email : "Email"}
                        value = {values.email}
                        className = "signup-email"
                        onChange={handleChange}
                        onBlur = {handleBlur}
                        type = "text"
                        margin="normal"
                        />
                      <TextField
                        error={errors.password && touched.password}
                        className = "signup-password"
                        label= {(errors.password && touched.password) ? "Password is required!" : "Password"}
                        id = "password"
                        type="password"
                        onChange={handleChange}
                        onBlur = {handleBlur}
                        value = {values.password}
                        margin="normal"
                      />
                      <TextField
                        error={errors.confirmpassword && touched.confirmpassword}
                        className = "signup-confirmpassword"
                        type="password"
                        label= {(errors.confirmpassword && touched.confirmpassword) ? "Confirm Password is required!" : "Confirm Password"}
                        value = {values.confirmpassword}
                        id = "confirmpassword"
                        onChange = {handleChange}
                        onBlur = {handleBlur}
                        margin="normal"
                      />
                        <label>{touched.confirmpassword && values.confirmpassword !== values.password && <div className="invalid-feedback">{"Passwords don't match!"}</div>}
                      </label>
                    <br/>
                    <div className = "buttons_group">
                      <Button
                        variant="contained"
                        color="primary"
                        className="outline something"
                        type="submit"
                        disabled={values.confirmpassword !== values.password || isSubmitting}> Submit </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="button"
                        className="reset button"
                        onClick={handleReset}
                        disabled={!dirty || isSubmitting}
                      >
                        Reset
                      </Button>
                    </div>
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

export default SignupForm
