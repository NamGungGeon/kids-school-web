import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import { useAddress } from "../../hook/useAddress";
import styles from "./SearchFilter.module.css";
import classNames from "classnames";
import Loading from "../../components/Loading/Loading";
import { useToasts } from "../../hook/useToast";
import { Button, Typography } from "@material-ui/core";
import { useGeolocation } from "../../hook/useGeolocation";
import { observer } from "mobx-react-lite";
import { useModal } from "../../hook/useModal";
import { useDeviceType } from "../../hook/useDeviceSize";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: "100%",
  },
  row: {
    display: "flex",
    alignItems: "center",
  },
  row_label: {
    width: 200,
  },
  formControl: {
    width: 120,
    marginRight: theme.spacing(1),
  },
  formControlLarge: {
    width: 240,
    marginRight: theme.spacing(1),
  },
  chip: {
    margin: theme.spacing(0.5),
    marginLeft: 0,
  },
}));
const allTimes = Array(24)
  .fill(0)
  .map((v, i) => i);

const MODE_INPUT = "MODE_INPUT";
const MODE_GEOLOCATION = "MODE_GEOLOCATION";

const SearchFilter = ({ onUpdate = (options) => {} }) => {
  const [isAddressLoaded, getSidoNames, getSggNames] = useAddress();
  const [sidoName, setSidoName] = useState("서울특별시");
  const [sggName, setSggName] = useState("송파구");
  const [locationMode, setLocationMode] = useState(MODE_INPUT);
  const [geolocation, requestGeolocation, flushGeolocation] = useGeolocation();
  const [kinderType, setKinderType] = useState();
  const [kinderName, setKinderName] = useState();
  const [_, addToast] = useToasts();
  const [__, setModal] = useModal();
  const [additionals, setAdditionals] = useState({
    requireHandicap: false,
    requireBus: false,
    requireCCTV: false,
  });
  const [times, setTimes] = useState({});
  const [deviceType] = useDeviceType();
  useEffect(() => {
    const filter = { sidoName, sggName, ...times, kinderType, kinderName };
    Object.keys(additionals).map((key) => {
      if (additionals[key]) {
        filter[key] = true;
      }
    });
    if (geolocation && locationMode === MODE_GEOLOCATION) {
      filter.lat = geolocation.lat;
      filter.lng = geolocation.lng;
    }
    console.log("filter", filter, additionals);
    onUpdate(filter);
  }, [
    sidoName,
    sggName,
    times,
    kinderType,
    kinderName,
    additionals,
    geolocation,
    locationMode,
  ]);
  const classes = useStyles();
  if (!isAddressLoaded) return <Loading />;
  return (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <p className={styles.label}>이름</p>
        <FormControl className={styles.form}>
          <TextField
            value={kinderName}
            label="검색할 유치원의 이름"
            onChange={(e) => {
              setKinderName(e.target.value);
            }}
          />
        </FormControl>
      </div>
      {deviceType === "desktop" && (
        <div className={styles.row}>
          <p className={styles.label}>위치 정보 모드 선택</p>
          <div className={styles.form}>
            {locationMode === MODE_INPUT && (
              <Button
                variant={"outlined"}
                color={"primary"}
                onClick={() => {
                  setModal(
                    <div>
                      <h2>사용자의 대략적인 위치 정보를 일회성으로 받습니다</h2>
                      <Typography>
                        언제든지 직접 위치 정보 입력 버튼을 눌러 위치를 직접
                        입력할 수 있습니다
                        <br />
                        위치 정보 요청을 거절한 경우 추후 이 기능을 사용하기
                        위해 앱 재설치 또는 브라우저 설정 변경이 필요할 수
                        있습니다
                        <br />
                        <br />
                        <a href="https://support.google.com/chrome/answer/142065?hl=ko">
                          크롬 브라우저 도움말
                        </a>
                      </Typography>
                      <br />
                      <Button
                        variant={"contained"}
                        fullWidth
                        color={"primary"}
                        onClick={() => {
                          setModal(null);
                          requestGeolocation()
                            .then(() => {
                              setLocationMode(MODE_GEOLOCATION);
                            })
                            .catch((msg) => {
                              addToast(msg, "error");
                            });
                        }}
                      >
                        현재 위치 정보 사용
                      </Button>
                    </div>
                  );
                }}
              >
                현재 위치 정보 사용
              </Button>
            )}
            {locationMode === MODE_GEOLOCATION && (
              <Button
                variant={"outlined"}
                color={"primary"}
                onClick={() => {
                  setLocationMode(MODE_INPUT);
                  flushGeolocation();
                }}
              >
                직접 위치 정보 입력
              </Button>
            )}
          </div>
        </div>
      )}
      {locationMode === MODE_GEOLOCATION && (
        <div className={styles.row}>
          <p className={styles.label}>현재 위치 정보</p>
          <div className={styles.form}>
            <div>위도: {geolocation?.lat}</div>
            <div>경도: {geolocation?.lng}</div>
          </div>
        </div>
      )}
      {locationMode === MODE_INPUT && (
        <div className={styles.row}>
          <p className={styles.label}>지역</p>
          <div className={styles.form}>
            <FormControl>
              <InputLabel>시/도</InputLabel>
              <Select
                value={sidoName}
                onChange={(e) => {
                  setSidoName(e.target.value);
                }}
              >
                {getSidoNames().map((sidoName) => {
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
                onChange={(e) => {
                  setSggName(e.target.value);
                }}
              >
                {getSggNames(sidoName).map((sggName) => {
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
      )}
      <div className={styles.row}>
        <p className={styles.label}>운영시간</p>
        <div className={styles.form}>
          <FormControl>
            <InputLabel>개원시간</InputLabel>
            <Select
              onChange={(e) => {
                setTimes({
                  ...times,
                  openTime: e.target.value,
                });
              }}
            >
              {allTimes.map((time) => {
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
              onChange={(e) => {
                setTimes({
                  ...times,
                  closeTime: e.target.value,
                });
              }}
            >
              {allTimes.map((time) => {
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
            onChange={(e) => {
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
                addToast("특수학급을 운영하지 않는 유치원도 표시합니다");
              } else {
                addToast("특수학급을 운영하는 유치원만 표시합니다");
              }
              setAdditionals({
                ...additionals,
                requireHandicap: !additionals.requireHandicap,
              });
            }}
          />
          <Chip
            className={classNames(classes.chip, styles.chip)}
            color={additionals.requireBus ? "primary" : "default"}
            label={"스쿨버스 운영"}
            onClick={() => {
              if (additionals.requireBus) {
                addToast("스쿨버스를 운영하지 않는 유치원도 표시합니다");
              } else {
                addToast("스쿨버스를 운영하는 유치원만 표시합니다");
              }
              setAdditionals({
                ...additionals,
                requireBus: !additionals.requireBus,
              });
            }}
          />
          <Chip
            className={classNames(classes.chip, styles.chip)}
            color={additionals.requireCCTV ? "primary" : "default"}
            label={"CCTV 운영"}
            onClick={() => {
              if (additionals.requireCCTV) {
                addToast("CCTV를 운영하지 않는 유치원도 표시합니다");
              } else {
                addToast("CCTV를 운영하는 유치원만 표시합니다");
              }
              setAdditionals({
                ...additionals,
                requireCCTV: !additionals.requireCCTV,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(SearchFilter);
