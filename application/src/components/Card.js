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
    marginTop: 50,
  },
  media: {
    height: 140,
  },
  marginBottom: {
    marginBottom: 10,
  },
});

export default function AddCard() {
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
        </CardContent>
        <Button
          className={classes.marginBottom}
          variant="contained"
          color="secondary"
        >
          To create
        </Button>
      </CardActionArea>
    </Card>
  );
}