import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { Button, Fab } from "@material-ui/core";

import { useQuery, useMutation } from "@apollo/client";
import Loader from "../asses/loader";
import {
  GET_USERS_QUERY,
  GET_USER_QUERY,
  CREATE_USER_MUTATION,
  UPDATE_USER_MUTATION,
  DELETE_USER_MUTATION,
} from "../queries/queries";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 1170,
    marginTop: 10,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
  },
  button: {
    margin: theme.spacing(1),
  },
  userList: {
    marginTop: 10,
  },
  icon: {
    fontSize: 40,
  },
}));

const UserList = () => {
  const [addUser, setAddUser] = React.useState(false);
  const [updateUser, setUpdateUser] = React.useState(false);
  const [updateName, setUpdateName] = React.useState("");
  const [updateEmail, setUpdateEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const { loading, error, data } = useQuery(GET_USERS_QUERY);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    variables: { name, email },
    refetchQueries: () => [{ query: GET_USERS_QUERY }],
  });

  const handleToggleId = (event, id) => {
    event.preventDefault();
    deleteUser({
      variables: { id },
      refetchQueries: () => [{ query: GET_USERS_QUERY }],
    });
  };
  // const handelDelete = (event, id) => {
  //   EventSource.preventDefault();
  //   deleteUser(id);
  // };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    createUser();
    setName("");
    setEmail("");
    setAddUser(false);
  };

  const classes = useStyles();
  if (loading)
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  if (error) return <p>Error :(</p>;

  const handleToggleUser = () => {
    setAddUser(!addUser);
  };
  console.log(data);

  return (
    <List dense className={classes.root}>
      <div className="center">
        <Fab
          onClick={handleToggleUser}
          size="medium"
          color="secondary"
          aria-label="add"
          className={classes.margin}
        >
          <AddIcon />
        </Fab>
      </div>

      {addUser && (
        <AddUser
          handleNameChange={handleNameChange}
          handleEmailChange={handleEmailChange}
          handleClick={handleClick}
          name={name}
          email={email}
        />
      )}
      {updateUser && <UpdateUser />}
      {data.users.map((users) => {
        const labelId = `${users.id}`;
        return (
          <ListItem
            className={classes.userList}
            key={users.id}
            data-id={users.id}
            button
          >
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${users.id}`}
                src={`https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId}>
              <span>
                Name: <span className="email">{users.name} </span>
              </span>
              <span>
                Email: <span className="email">{users.email}</span>
              </span>
            </ListItemText>
            <ListItemSecondaryAction data-id={users.id}>
              <Fab color="secondary" size="small" aria-label="edit">
                <EditIcon />
              </Fab>
              <Button
                variant="contained"
                color="secondary"
                onClick={(event) => handleToggleId(event, users.id)}
                className={classes.button}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default UserList;
