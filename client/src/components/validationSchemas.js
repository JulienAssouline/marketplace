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

  export const addItemValidation = Yup.object().shape({
        item_name: Yup.string()
          .required("Item name is required!"),
        item_type: Yup.string(),
        price: Yup.string()
          .required("Price is required!"),
        inventory: Yup.number()
          .required("Inventory is required!"),
        status: Yup.boolean()
          .required("Status is required"),
        item_description: Yup.string()

       })