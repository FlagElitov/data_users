import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Button, Fab, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  userList: {
    marginTop: 10,
  },
}));

const Users = ({
  users,
  handleToggleIdUpdate,
  handleToggleIdDelete,
  
}) => {
  const classes = useStyles();
  return (
    <ListItem className={classes.userList} button>
      <ListItemAvatar>
        <Avatar
          alt={`Avatar n°${users.id}`}
          src={`https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png`}
        />
      </ListItemAvatar>
      <ListItemText>
        <span className="width">
          Name: <span className="email">{users.name} </span>
        </span>
        <span className="width">
          Email: <span className="email">{users.email}</span>
        </span>
      </ListItemText>
      <ListItemSecondaryAction data-id={users.id}>
        <Fab
          onClick={(event) => {
            handleToggleIdUpdate(event, users.id, users.name, users.email);
          }}
          color="secondary"
          size="small"
          aria-label="edit"
        >
          <EditIcon />
        </Fab>
        <Button
          variant="contained"
          color="secondary"
          onClick={(event) => handleToggleIdDelete(event, users.id)}
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default Users;
