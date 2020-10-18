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

import { useQuery } from "@apollo/client";
import { Fab } from "@material-ui/core";
import Loader from "../asses/loader";
import { GET_USERS_QUERY } from "../queries/queries";
import AddUser from "./AddUser";
import AddCard from "./Card";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 1170,
    marginTop: 10,
    backgroundColor: theme.palette.background.paper,
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
  const { loading, error, data } = useQuery(GET_USERS_QUERY);
  const [checked, setChecked] = React.useState([]);
  const [addCard, setAddCard] = React.useState(false);
  const classes = useStyles();
  console.log(data);
  if (loading)
    return (
      <div className="loader">
        <Loader />
      </div>
    );
  if (error) return <p>Error :(</p>;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense className={classes.root}>
      <div className="center">
        <Fab
          size="medium"
          color="secondary"
          aria-label="add"
          className={classes.margin}
        >
          <AddIcon />
        </Fab>
      </div>

      <AddCard />
      {data.users.map((users) => {
        const labelId = `checkbox-list-secondary-label-${users.id}`;
        return (
          <ListItem className={classes.userList} key={users.id} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${users.id}`}
                src={`/static/images/avatar/.jpg`}
              />
            </ListItemAvatar>
            <ListItemText id={labelId}>
              <span> Name: {users.name} </span>{" "}
              <span className="email"> Email: {users.email} </span>
            </ListItemText>
            <ListItemSecondaryAction>
              <Fab color="secondary" size="small" aria-label="edit">
                <EditIcon />
              </Fab>
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default UserList;

// import React from "react";
// import { gql } from "apollo-boost";
// import { graphql } from "apollo-boost";

// const getUsersQuery = gql`
//   query users {
//     users {
//       id
//       name
//       email
//     }
//   }
// `;

// const UserList = (props) => {
//   return <h1>dfs</h1>;
// };

// export default UserList;
