import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import { useAddress } from "../../hook/useAddress";
import CircularProgress from "@material-ui/core/CircularProgress";
import styles from "./SearchFilter.module.css";
import classNames from "classnames";
import Loading from "../../components/Loading/Loading";
import { useToasts } from "../../hook/useToast";
import { AddPhotoAlternateSharp } from "@material-ui/icons";

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
    margin: theme.spacing(0.5),
    marginLeft: 0
  }
}));
const allTimes = Array(24)
  .fill(0)
  .map((v, i) => i);

const SearchFilter = ({ onUpdate = options => {} }) => {
  const [isAddressLoaded, getSidoNames, getSggNames] = useAddress();
  const [sidoName, setSidoName] = useState("서울특별시");
  const [sggName, setSggName] = useState("송파구");
  const [kinderType, setKinderType] = useState();
  const [kinderName, setKinderName] = useState();
  const [_, addToast] = useToasts();
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
  if (!isAddressLoaded) return <Loading />;
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <p className={styles.label}>이름</p>
        <FormControl className={styles.form}>
          <TextField
            value={kinderName}
            label="검색할 유치원/어린이집의 이름"
            onChange={e => {
              setKinderName(e.target.value);
            }}
          />
        </FormControl>
      </div>
      <div className={styles.row}>
        <p className={styles.label}>지역</p>
        <div className={styles.form}>
          <FormControl>
            <InputLabel>시/도</InputLabel>
            <Select
              value={sidoName}
              onChange={e => {
                setSidoName(e.target.value);
              }}
            >
              {getSidoNames().map(sidoName => {
                return (
                  <MenuItem key={`sido-${sidoName}`} value={sidoName}>
                    {sidoName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>시/군/구</InputLabel>
            <Select
              value={sggName}
              onChange={e => {
                setSggName(e.target.value);
              }}
            >
              {getSggNames(sidoName).map(sggName => {
                return (
                  <MenuItem key={`sgg-${sggName}`} value={sggName}>
                    {sggName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={styles.row}>
        <p className={styles.label}>운영시간</p>
        <div className={styles.form}>
          <FormControl>
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
                return (
                  <MenuItem key={`open-${time}`} value={time}>
                    {time}시 이전
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
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
                return (
                  <MenuItem key={`close-${time}`} value={time}>
                    {time}시 이후
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={styles.row}>
        <p className={styles.label}>설립유형</p>
        <FormControl className={styles.form}>
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
      <div className={styles.row}>
        <p className={styles.label}>특이사항</p>
        <div className={styles.form}>
          <Chip
            className={classNames(classes.chip, styles.chip)}
            color={additionals.requireHandicap ? "primary" : "default"}
            label={"특수학급반 운영"}
            onClick={() => {
              if (additionals.requireHandicap) {
                addToast(
                  "특수학급을 운영하지 않는 유치원/어린이집도 표시합니다"
                );
              } else {
                addToast("특수학급을 운영하는 유치원/어린이집만 표시합니다");
              }
              setAdditionals({
                ...additionals,
                requireHandicap: !additionals.requireHandicap
              });
            }}
          />
          <Chip
            className={classNames(classes.chip, styles.chip)}
            color={additionals.requireBus ? "primary" : "default"}
            label={"스쿨버스 운영"}
            onClick={() => {
              if (additionals.requireBus) {
                addToast(
                  "스쿨버스를 운영하지 않는 유치원/어린이집도 표시합니다"
                );
              } else {
                addToast("스쿨버스를 운영하는 유치원/어린이집만 표시합니다");
              }
              setAdditionals({
                ...additionals,
                requireBus: !additionals.requireBus
              });
            }}
          />
          <Chip
            className={classNames(classes.chip, styles.chip)}
            color={additionals.requireCCTV ? "primary" : "default"}
            label={"CCTV 운영"}
            onClick={() => {
              if (additionals.requireCCTV) {
                addToast("CCTV를 운영하지 않는 유치원/어린이집도 표시합니다");
              } else {
                addToast("CCTV를 운영하는 유치원/어린이집만 표시합니다");
              }
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
