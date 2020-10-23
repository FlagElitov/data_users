import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles({
  root: {
    width: 150,
  },
});

const LimitUsers = ({ skip, limit, setSkip, setLimit }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState([skip, limit]);

  console.log(value);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangePress = (event) => {
    event.preventDefault();
    setSkip(value[0]);
    setLimit(value[1]);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {value[0]} do {value[1]}
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        onKeyPress={handleChangePress}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    </div>
  );
};
export default LimitUsers;
