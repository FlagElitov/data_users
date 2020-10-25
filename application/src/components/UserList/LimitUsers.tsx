import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Button } from "@material-ui/core";

interface LimitUsersProps {
  skip: number;
  limit: number;
  setSkip: (value: number) => void;
  setLimit: (value: number) => void;
}

const useStyles = makeStyles({
  root: {
    width: 250,
    marginBottom: -50,
    display: "flex",
  },
});

const LimitUsers: React.FC<LimitUsersProps> = ({
  skip,
  limit,
  setSkip,
  setLimit,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState<number[]>([skip, limit]);

  // const handleChange = (event:,newValue:) => {
  //
  //   setValue(newValue);
  // };

  const handleChange = (event: any, newValue: number | number[]) => {
    event.preventDefault();
    setValue(newValue as number[]);
  };
  const handleChangePress = (event: React.MouseEvent) => {
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
