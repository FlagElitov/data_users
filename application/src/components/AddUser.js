import React from "react";
const {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} = require("@material-ui/core");

const AddUser = () => {
  return (
    <>
    


      <FormControl>
        <InputLabel htmlFor="my-input">Your name</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We'll never share your name.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
        <FormHelperText id="my-helper-text">
          We'll never share your email.
        </FormHelperText>
      </FormControl>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
    </>
  );
};

export default AddUser;
