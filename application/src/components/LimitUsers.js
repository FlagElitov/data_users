import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 250,
    marginBottom: -50,
    display: "flex",
  },
});

const LimitUsers = ({ skip, limit, setSkip, setLimit }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState([skip, limit]);

  console.log(value);
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };
  const handleChangePress = (event) => {
    event.preventDefault();
    setSkip(value[0]);
    setLimit(value[1]);
  };

  return (
    <div className={classes.root}>
      <div>
        <Typography id="range-slider" gutterBottom>
          {value[0]} do {value[1]}
        </Typography>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          max="50"
          aria-labelledby="range-slider"
        />
      </div>
      <div>
        <Button onClick={handleChangePress} color="primary">
          Go
        </Button>
      </div>
    </div>
  );
};
export default LimitUsers;
