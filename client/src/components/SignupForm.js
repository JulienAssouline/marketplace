import React from 'react';
import { Formik, Form } from "formik";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";


import { signupValidation } from "./validationSchemas"


const SIGN_UP_MUTATION = gql`
  mutation signUpMutation($email: String!, $fullname: String!, $username: String!, $password: String!, $country: String!) {
     signUp(email: $email, fullname: $fullname username: $username, password: $password, country: $country) {
      message
     }
   }
`

function SignupForm(props) {
  return(
    <div id = "signup">
    <br />
    <Mutation
      mutation = {SIGN_UP_MUTATION}
      onError={(error) => {
        console.log(error)
      }}
      onCompleted = {(data) => {
        console.log("Data: ", data)
        // alert("signed up!")
       props.history.push("/home")
      }}
    >
      { (signUp, {data}) =>(
        <Formik
            initialValues = {{ email: "", username: "", fullname: "", country: "", password: "", confirmpassword: '' }}
            onSubmit={(values, {setSubmitting}) => {
                signUp({variables: {
                  email: values.email,
                  fullname: values.fullname,
                  country: values.country,
                  username: values.username,
                  password: values.password
                }
              })
              setSubmitting(false)
              alert(JSON.stringify(values, null, 2))
            }}
            validationSchema = {
              signupValidation
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
                      <h1> Sign Up Form </h1>
                      <TextField
                        id= "username"
                        label= "User Name"
                        value = {values.username}
                        className = "signup-username"
                        onChange={handleChange}
                        onBlur = {handleBlur}
                        type = "text"
                        margin="normal"
                        />
                      <TextField
                        id= "fullname"
                        label= "Full Name"
                        value = {values.fullname}
                        className = "signup-fullname"
                        onChange={handleChange}
                        onBlur = {handleBlur}
                        type = "text"
                        margin="normal"
                        />
                      <TextField
                        id= "country"
                        label= "Country"
                        value = {values.country}
                        className = "signup-country"
                        onChange={handleChange}
                        onBlur = {handleBlur}
                        type = "text"
                        margin="normal"
                        />
                      <TextField
                        required
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
                        required
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
                        required
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
                        className="submit button"
                        type="submit"
                        disabled={values.confirmpassword !== values.password || isSubmitting}> Submit
                        </Button>
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
