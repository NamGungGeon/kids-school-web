import React from "react";
import Chip from "@material-ui/core/Chip";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import SportsIcon from "@material-ui/icons/Sports";
import StarIcon from "@material-ui/icons/Star";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5),
    marginLeft: 0
  }
}));
const SchoolSpecOverview = ({ school, size = "small", color }) => {
  const classes = useStyles();
  const chipStyle = {};
  if (color) chipStyle.background = color;
  const getStyle = allow => {
    return allow ? chipStyle : {};
  };
  return (
    <div>
      <Chip
        icon={<FavoriteIcon />}
        color={school.insurances.length ? "primary" : "basic"}
        size={size}
        style={getStyle(school.insurances.length)}
        className={classes.chip}
        label={`가입보험수: ${school.insurances.length}개`}
      />
      <Chip
        icon={<DirectionsBusIcon />}
        color={school.busCount ? "primary" : "basic"}
        size={size}
        style={getStyle(school.busCount)}
        className={classes.chip}
        label={`스쿨버스 ${
          school.busCount ? `${school.busCount}대 운영` : "미운영"
        }`}
      />
      <Chip
        icon={<CameraAltIcon />}
        color={school.cctvCount ? "primary" : "basic"}
        size={size}
        style={getStyle(school.cctvCount)}
        className={classes.chip}
        label={`CCTV: ${
          school.cctvCount ? `${school.cctvCount}대 운영` : "미운영"
        }`}
      />
      {school.openTime && school.closeTime && (
        <Chip
          icon={<AccessTimeIcon />}
          color={"primary"}
          size={size}
          style={chipStyle}
          className={classes.chip}
          label={`운영시간: ${school.openTime}~${school.closeTime}`}
        />
      )}
      <Chip
        icon={<FastfoodIcon />}
        color={"primary"}
        size={size}
        style={chipStyle}
        className={classes.chip}
        label={`급식: ${school.foodType}`}
      />
      <Chip
        icon={<SportsIcon />}
        color={school.groundSize ? "primary" : "basic"}
        size={size}
        style={getStyle(school.groundSize)}
        label={`운동장 ${school.groundSize ? `있음` : "없음"}`}
      />
      <Chip
        icon={<StarIcon />}
        color={school.classCountHandicap ? "primary" : "basic"}
        size={size}
        style={getStyle(school.classCountHandicap)}
        className={classes.chip}
        label={`특수학급 ${school.classCountHandicap ? `있음` : "없음"}`}
      />
    </div>
  );
};

export default SchoolSpecOverview;
