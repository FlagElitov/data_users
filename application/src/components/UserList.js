import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";

import { useQuery, useMutation } from "@apollo/client";
import Loader from "../assest/loader";
import {
  GET_USERS_QUERY,
  GET_USER_QUERY,
  CREATE_USER_MUTATION,
  UPDATE_USER_MUTATION,
  DELETE_USER_MUTATION,
} from "../queries/queries";
import AddUser from "./AddUser";
import isEmail from "validator/lib/isEmail";
import LimitUsers from "./LimitUsers";
import Users from "./Users";

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
  const [validateEmail, setValidateEmail] = React.useState(false);
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [skip, setSkip] = React.useState(0);
  const [limit, setLimit] = React.useState(10);

  const { loading, error, data } = useQuery(GET_USERS_QUERY, {
    variables: { skip, limit },
    refetchQueries: [{ query: GET_USERS_QUERY }],
  });
  // const {} = useQuery(GET_USER_QUERY, {
  //   variables: { id },
  //   refetchQueries: [{ query: GET_USERS_QUERY }],
  // });
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);
  const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    variables: { id, name, email },
    refetchQueries: [{ query: GET_USERS_QUERY }],
  });
  const [createUser] = useMutation(CREATE_USER_MUTATION, {
    variables: { name, email },
    refetchQueries: [{ query: GET_USERS_QUERY }],
  });

  const handleToggleIdDelete = (event, id) => {
    event.preventDefault();
    deleteUser({
      variables: { id },
      refetchQueries: [{ query: GET_USERS_QUERY }],
    });
  };
  const handleToggleIdUpdate = (event, id, name, email) => {
    event.preventDefault();
    setId(id);
    setName(name);
    setEmail(email);
    setAddUser(!addUser);
    setValidateEmail(isEmail(email));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setValidateEmail(isEmail(email));
  };

  const handleClick = () => {
    createUser();
    setName("");
    setEmail("");
    setAddUser(false);
  };
  const handleClickUpdate = (e) => {
    e.preventDefault();
    updateUser();
    setName("");
    setEmail("");
    setId("");
    setAddUser(false);
    setValidateEmail(false);
  };

  const handleToggleUser = () => {
    setName("");
    setEmail("");
    setId("");
    setAddUser(!addUser);
  };

  const classes = useStyles();
  if (loading)
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  if (error) return <p>Error :(</p>;

  return (
    <List dense className={classes.root}>
      <div className="center">
        <LimitUsers
          skip={skip}
          limit={limit}
          setSkip={setSkip}
          setLimit={setLimit}
        />
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
          validateEmail={validateEmail}
          id={id}
          name={name}
          email={email}
          handleClickUpdate={handleClickUpdate}
        />
      )}
      {data.users.map((users) => {
        const labelId = `${users.id}`;
        return (
          <Users
            key={labelId}
            users={users}
            handleToggleIdUpdate={handleToggleIdUpdate}
            handleToggleIdDelete={handleToggleIdDelete}
          />
          // <ListItem
          //   className={classes.userList}
          //   key={users.id}
          //   data-id={users.id}
          //   button
          // >
          //   <ListItemAvatar>
          //     <Avatar
          //       alt={`Avatar n°${users.id}`}
          //       src={`https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png`}
          //     />
          //   </ListItemAvatar>
          //   <ListItemText id={labelId}>
          //     <span className="width">
          //       Name: <span className="email">{users.name} </span>
          //     </span>
          //     <span className="width">
          //       Email: <span className="email">{users.email}</span>
          //     </span>
          //   </ListItemText>
          //   <ListItemSecondaryAction data-id={users.id}>
          //     <Fab
          //       onClick={(event) => {
          //         handleToggleIdUpdate(
          //           event,
          //           users.id,
          //           users.name,
          //           users.email
          //         );
          //       }}
          //       color="secondary"
          //       size="small"
          //       aria-label="edit"
          //     >
          //       <EditIcon />
          //     </Fab>
          //     <Button
          //       variant="contained"
          //       color="secondary"
          //       onClick={(event) => handleToggleIdDelete(event, users.id)}
          //       className={classes.button}
          //       startIcon={<DeleteIcon />}
          //     >
          //       Delete
          //     </Button>
          //   </ListItemSecondaryAction>
          // </ListItem>
        );
      })}
    </List>
  );
};

export default UserList;
