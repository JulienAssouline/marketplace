import React from "react"
import { Formik, Form } from "formik";
import Button from '@material-ui/core/Button';
import NumberFormat from 'react-number-format';
import TextField from '@material-ui/core/TextField'
import {addItemValidation} from "./validationSchemas"
import InputAdornment from '@material-ui/core/InputAdornment';
import FormLabel from '@material-ui/core/FormLabel';
import gql from "graphql-tag"
import { Mutation } from "react-apollo"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const ADD_ITEMS_MUTATION = gql`
  mutation additemsMutation($item_name: String!, $item_type: String, $status: String!, $price: Float!, $inventory: Int!, $item_description: String) {
    addItem(item_name: $item_name, item_type: $item_type, status: $status, price: $price, inventory: $inventory, item_description: $item_description ) {
      message
    }
  }
`

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

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
      <br />
      <Mutation
      mutation = {ADD_ITEMS_MUTATION}
      onError = {(error) => {
        console.log(error)
      }}
      onCompleted = {(data) => {
        console.log("Data: ", data)
      }}
      >
    {
      (addItem, {data}) => (
        <Formik
              initialValues = {{ item_name:"", item_type: "", price: "", inventory: 0, status: true, item_description: "" }}
              onSubmit={(values, {setSubmitting}) => {


                addItem({variables: {
                  item_name: values.item_name,
                  item_type: values.item_type,
                  status: (values.status  ? values.status = "active" : values.status = "inactive"),
                  price: parseFloat(values.price.replace(/,/g, '')),
                  inventory: values.inventory,
                  item_description: values.item_description
                }

                })
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

                  console.log(values.status)

                  return (
                    <Form className = "form" onSubmit={handleSubmit}>
                    <h1> Add Items </h1>
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
                      <div className = "price-inventory-wrapper">
                        <TextField
                          required
                          error={errors.price && touched.price}
                          id= "price"
                          name = "price"
                          value = {values.price}
                          label= {(errors.price && touched.price) ? errors.price : "Price"}
                          className = "additem price"
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
                          className = "additem inventory"
                          onChange={handleChange}
                          onBlur = {handleBlur}
                          margin="normal"
                        />
                      </div>
                      <TextField
                        id= "item_description"
                        value = {values.item_description}
                        multiline
                        rows="4"
                        label= "Item Description"
                        className = "additem-item-description precise"
                        onChange={handleChange}
                        onBlur = {handleBlur}
                      />
                      <div className = "toggle-wrapper">
                        <FormLabel required component="legend"> Sell item to marketplace? </FormLabel>
                        <FormControlLabel
                           className = "status toggle"
                           control={
                              <Switch
                                id = "status"
                                checked={
                                  values.status ? values.status = true : values.status = false
                                }
                                onChange={handleChange}
                                value={values.status}
                                onBlur = {handleBlur}
                                margin = "normal"
                              />
                            }
                            label={ values.status ? "Yes" : "Not yet"}
                          />
                        </div>
                      <br />
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
          )
      }
    </Mutation>
    </div>
  )
}

export default AddItems