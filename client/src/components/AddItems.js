import React from "react"
import { Formik, Form } from "formik";
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField'
import {addItemValidation} from "./validationSchemas"
import InputAdornment from '@material-ui/core/InputAdornment';
import gql from "graphql-tag"

// const ADD_ITEMS_MUTATION = gql`
//   mutation
// `

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  // console.log(onChange)

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange("price", values.formattedValue);
      }}
      thousandSeparator
    />
  );
}

function AddItems() {
  return (
    <div className = "add-item">
    <h1> Add Items </h1>
    <Formik
    initialValues = {{ item_name:"", item_type: "", price: "", inventory: 0, item_description: "" }}
    onSubmit={(values, {setSubmitting}) => {
      console.log(values)
      setSubmitting(false)
      alert(JSON.stringify(values, null, 2))
    }}
    validationSchema = {
      addItemValidation
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
          isSubmitting,
          setFieldValue,
          dirty,
          handleReset

        } = props;

        // console.log(999)

        return (
          <Form className = "form" onSubmit={handleSubmit}>
            <TextField
              required
              error={errors.item_name && touched.item_name}
              type = "text"
              id= "item_name"
              label= {(errors.item_name && touched.item_name) ? errors.item_name : "Item Name"}
              value = {values.item_name}
              className = "additem-itemname"
              onChange={handleChange}
              onBlur = {handleBlur}
              margin="normal"
            />
             <TextField
              type = "text"
              id= "item_type"
              label= "Item Type"
              value = {values.item_type}
              className = "additem-itemtype"
              onChange={handleChange}
              onBlur = {handleBlur}
              margin="normal"
            />
            <TextField
              required
              error={errors.price && touched.price}
              id= "price"
              name = "price"
              value = {values.price}
              label= {(errors.price && touched.price) ? errors.price : "Price"}
              className = "additem-price"
              onChange={setFieldValue}
              onBlur = {handleBlur}
              margin="normal"
              InputProps={{
                inputComponent: NumberFormatCustom,
                startAdornment: <InputAdornment position="start">$</InputAdornment>
              }}
            />
            <TextField
              required
              error={errors.inventory && touched.inventory}
              id= "inventory"
              value = {values.inventory}
              type = "number"
              label= {(errors.inventory && touched.inventory) ? errors.inventory : "Inventory"}
              className = "additem-inventory"
              onChange={handleChange}
              onBlur = {handleBlur}
              margin="normal"
            />
            <TextField
              id= "item_description"
              value = {values.item_description}
              multiline
              rows="4"
              label= "Item Description"
              className = "additem-item-description"
              onChange={handleChange}
              onBlur = {handleBlur}
              margin="normal"
            />
            <div className = "buttons_group">
              <Button
                variant="contained"
                color="primary"
                className="outline something"
                type="submit"
                disabled={isSubmitting}> Submit
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
    </div>
  )
}

export default AddItems