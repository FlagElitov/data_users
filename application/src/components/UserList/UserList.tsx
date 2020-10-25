import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";

import { useQuery, useMutation } from "@apollo/client";
import Loader from "../../assest/loader";
import {
  GET_USERS_QUERY,
  GET_USER_QUERY,
  CREATE_USER_MUTATION,
  UPDATE_USER_MUTATION,
  DELETE_USER_MUTATION,
} from "../../queries/queries";
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

const UserList: React.FC = () => {
  const [addUser, setAddUser] = React.useState<boolean>(false);
  const [validateEmail, setValidateEmail] = React.useState<boolean>(false);
  const [id, setId] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [skip, setSkip] = React.useState<number>(0);
  const [limit, setLimit] = React.useState<number>(10);

  const { loading, error, data } = useQuery(GET_USERS_QUERY, {
    variables: { skip, limit },
    query: GET_USERS_QUERY,
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

  const handleToggleIdDelete = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    deleteUser({
      variables: { id },
      refetchQueries: [{ query: GET_USERS_QUERY }],
    });
  };
  const handleToggleIdUpdate = (
    event: React.MouseEvent,
    id: string,
    name: string,
    email: string
  ) => {
    event.preventDefault();
    setId(id);
    setName(name);
    setEmail(email);
    setAddUser(!addUser);
    setValidateEmail(isEmail(email));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setValidateEmail(isEmail(email));
  };

  const handleClick = () => {
    createUser();
    setName("");
    setEmail("");
    setAddUser(false);
  };
  const handleClickUpdate = () => {
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
      {data.users.map((users: any) => {
        const labelId = `${users.id}`;
        return (
          <Users
            key={labelId}
            users={users}
            handleToggleIdUpdate={handleToggleIdUpdate}
            handleToggleIdDelete={handleToggleIdDelete}
          />
        );
      })}
    </List>
  );
};

export default UserList;
