import * as Yup from 'yup';


export const signupValidation = Yup.object().shape({
                email: Yup.string()
                  .email('Invalid email')
                  .required("Email is required!"),
                username: Yup.string(),
                password: Yup.string()
                  .required("password is required!"),
                confirmpassword: Yup.string()
                  .required("confirm password is required!")
              })

  export const loginValidation = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email')
          .required("Email is required"),
        password: Yup.string()
          .required("password is required!")
      })