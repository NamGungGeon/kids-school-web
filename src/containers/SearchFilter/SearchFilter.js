import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import { getAddresses, getSchoolsByAddress } from "../../http";
import { useAddress } from "../../hook/useAddress";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  },
  formControlLarge: {
    width: 240,
    marginRight: theme.spacing(1)
  },
  chip: {
    margin: theme.spacing(1),
    marginLeft: 0
  }
}));
const allTimes = Array(24)
  .fill(0)
  .map((v, i) => i);

const SearchFilter = ({ onUpdate = options => {} }) => {
  const [isAddressLoaded, getSidoNames, getSggNames] = useAddress();
  const [sidoName, setSidoName] = useState();
  const [sggName, setSggName] = useState();
  const [kinderType, setKinderType] = useState();
  const [kinderName, setKinderName] = useState();
  const [additionals, setAdditionals] = useState({
    requireHandicap: false,
    requireBus: false,
    requireCCTV: false
  });
  const [times, setTimes] = useState({});
  useEffect(() => {
    const filter = { sidoName, sggName, ...times, kinderType, kinderName };
    Object.keys(additionals).map(key => {
      if (additionals[key]) {
        filter[key] = true;
      }
    });
    console.log("filter", filter, additionals);
    onUpdate(filter);
  }, [sidoName, sggName, times, kinderType, kinderName, additionals]);
  const classes = useStyles();

  if (!isAddressLoaded) return <CircularProgress />;
  return (
    <div className={classes.wrapper}>
      <div className={classes.row}>
        <p className={classes.row_label}>이름</p>
        <FormControl className={classes.formControlLarge}>
          <TextField
            value={kinderName}
            label="검색할 유치원/어린이집의 이름"
            onChange={e => {
              setKinderName(e.target.value);
            }}
          />
        </FormControl>
      </div>
      <div className={classes.row}>
        <p className={classes.row_label}>지역</p>
        <FormControl className={classes.formControl}>
          <InputLabel>시/도</InputLabel>
          <Select
            onChange={e => {
              setSidoName(e.target.value);
            }}
          >
            {getSidoNames().map(sidoName => {
              return <MenuItem value={sidoName}>{sidoName}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>시/군/구</InputLabel>
          <Select
            onChange={e => {
              setSggName(e.target.value);
            }}
          >
            {getSggNames(sidoName).map(sggName => {
              return <MenuItem value={sggName}>{sggName}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      <div className={classes.row}>
        <p className={classes.row_label}>운영시간</p>
        <FormControl className={classes.formControl}>
          <InputLabel>개원시간</InputLabel>
          <Select
            onChange={e => {
              setTimes({
                ...times,
                openTime: e.target.value
              });
            }}
          >
            {allTimes.map(time => {
              return <MenuItem value={time}>{time}시</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>폐원시간</InputLabel>
          <Select
            onChange={e => {
              setTimes({
                ...times,
                closeTime: e.target.value
              });
            }}
          >
            {allTimes.map(time => {
              return <MenuItem value={time}>{time}시</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
      <div className={classes.row}>
        <p className={classes.row_label}>설립유형</p>
        <FormControl className={classes.formControl}>
          <InputLabel>설립유형</InputLabel>
          <Select
            onChange={e => {
              setKinderType(e.target.value);
            }}
          >
            <MenuItem value={"공립"}>공립</MenuItem>
            <MenuItem value={"사립"}>사립</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.row}>
        <p className={classes.row_label}>특이사항</p>
        <div>
          <Chip
            className={classes.chip}
            color={additionals.requireHandicap ? "primary" : "basic"}
            label={"특수학급반"}
            onClick={() => {
              setAdditionals({
                ...additionals,
                requireHandicap: !additionals.requireHandicap
              });
            }}
          />
          <Chip
            className={classes.chip}
            color={additionals.requireBus ? "primary" : "basic"}
            label={"스쿨버스 운영"}
            onClick={() => {
              setAdditionals({
                ...additionals,
                requireBus: !additionals.requireBus
              });
            }}
          />
          <Chip
            className={classes.chip}
            color={additionals.requireCCTV ? "primary" : "basic"}
            label={"CCTV 운영"}
            onClick={() => {
              setAdditionals({
                ...additionals,
                requireCCTV: !additionals.requireCCTV
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
