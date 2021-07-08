import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: "100%"
  },
  row: {
    display: "flex",
    alignItems: "center"
  },
  row_label: {
    width: 200
  },
  formControl: {
    width: 120,
    marginRight: theme.spacing(1)
  }
}));
const times = Array(24)
  .fill(0)
  .map((v, i) => i);

const SearchFilter = (onUpdate = options => {}) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.row}>
        <p className={classes.row_label}>지역</p>
        <FormControl className={classes.formControl}>
          <InputLabel>시/도</InputLabel>
          <Select>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>시/군/구</InputLabel>
          <Select>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.row}>
        <p className={classes.row_label}>운영시간</p>
        <FormControl className={classes.formControl}>
          <InputLabel>개원시간</InputLabel>
          <Select>
            {times.map(time => {
              return <MenuItem value={time}>{time}시</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>폐원시간</InputLabel>
          <Select>
            {times.map(time => {
              return <MenuItem value={time}>{time}시</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      <div className={classes.row}>
        <p className={classes.row_label}>설립유형</p>
        <FormControl className={classes.formControl}>
          <InputLabel>설립유형</InputLabel>
          <Select>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.row}>
        <p className={classes.row_label}>특이사항</p>
        <div>
          <Chip color="primary" label={"특수학급반"} onClick={() => {}} />
          <Chip color="primary" label={"스쿨버스 운영"} />
          <Chip color="primary" label={"CCTV 운영"} />
          <Chip color="primary" label={"공기청정기 설치"} />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
