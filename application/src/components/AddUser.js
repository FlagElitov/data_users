import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    textAlign: "center",
    margin: "auto",
    marginTop: 40,
    position: "absolute",
    zIndex: 1,
    left: 410,
  },
  media: {
    height: 140,
  },
  marginBottom: {
    marginBottom: 10,
  },
});

const AddUser = ({
  handleNameChange,
  handleEmailChange,
  handleClick,
  validateEmail,
  name,
  email,
  id,
  handleClickUpdate,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png"
          title="Avatar"
        />
        <CardContent>
          <FormControl>
            <InputLabel htmlFor="my-input">Your name</InputLabel>
            <Input
              value={name}
              onChange={handleNameChange}
              id="my-input"
              aria-describedby="my-helper-text"
            />
            <FormHelperText id="my-helper-text">
              We'll never share your name.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>

            <Input
              value={email}
              onChange={handleEmailChange}
              id="my-input"
              aria-describedby="my-helper-text"
            />
            <FormHelperText id="my-helper-text">
              {!validateEmail ? (
                <span className="error">Validate Email </span>
              ) : (
                "Success your email."
              )}
            </FormHelperText>
          </FormControl>
        </CardContent>
      </CardActionArea>
      <Button
        className={classes.marginBottom}
        onClick={!id ? handleClick : handleClickUpdate}
        disabled={!validateEmail}
        variant="contained"
        color="secondary"
      >
        {!id ? " To create" : "To update"}
      </Button>
    </Card>
  );
};

export default AddUser;
