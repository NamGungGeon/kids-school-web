import React, { useEffect, useState } from "react";
import {
  getChildrenViolations,
  getKinderViolations,
  getSchoolInfo
} from "../../http";
import Loading from "../../components/Loading/Loading";
import Map from "../../components/Map/Map";
import { IconButton, Typography } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import StarIcon from "@material-ui/icons/Star";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Alert from "@material-ui/lab/Alert";
import { useCompares } from "../../hook/useCompares";
import Tooltip from "@material-ui/core/Tooltip";
import { useToasts } from "../../hook/useToast";
import SchoolSpecOverview from "../SchoolSpecOverview/SchoolSpecOverview";
import { observer } from "mobx-react-lite";
import ShareIcon from "@material-ui/icons/Share";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  header: {
    justifyContent: "space-between",
    width: "100%",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing(0.5),
    marginLeft: 0
  },
  paper: {
    margin: theme.spacing(1)
  },
  title: {
    marginTop: 0
  }
}));

const execCopy = ref => {
  if (!document.queryCommandSupported("copy")) {
    return false;
  }
  if (ref) {
    ref.style.display = "block";
    ref.focus();
    ref.select();
    document.execCommand("copy");
    return true;
  }

  return false;
};

let childrenViolations = null;
const SchoolInfo = ({ kinderCode, school = null }) => {
  const classes = useStyles();
  const [info, setInfo] = useState(school);
  const [_, addToast] = useToasts();
  const [compares, addCompare, removeCompare] = useCompares();
  const [inputRef, setInputRef] = useState();
  const [violations, setViolations] = useState();
  const isInCompares = () => {
    return compares.indexOf(info?.kinderCode) !== -1;
  };
  useEffect(() => {
    if (!info) {
      getSchoolInfo(kinderCode)
        .then(res => {
          const { school } = res.data;
          setInfo(school);
        })
        .catch(console.error);
    }
  }, [kinderCode]);
  useEffect(() => {
    if (violations) console.log("violations", violations);
  }, [violations]);
  useEffect(() => {
    console.log("info", info);
    if (info?.kinderName) {
      if (info.kinderName.includes("?????????")) {
        getKinderViolations(kinderCode)
          .then(res => {
            const violations = res.data;
            if (violations.length) setViolations(violations);
          })
          .catch(console.error);
      } else if (info.kinderName.includes("????????????")) {
        const setter = () => {
          if (childrenViolations) {
            const violations = childrenViolations.filter(violation => {
              return (
                info.address.includes(violation.sidoName) &&
                info.address.includes(violation.sggName) &&
                info.kinderName === violation.kinderName
              );
            });
            if (violations.length) setViolations(violations);
          }
        };
        if (childrenViolations) {
          setter();
        } else {
          getChildrenViolations()
            .then(res => {
              const violations = res.data;
              childrenViolations = violations;
              setter();
            })
            .catch(console.error);
        }
      }
    }
  }, [info]);

  if (!info) return <Loading />;
  //info
  // address: "??????????????? ????????? ?????????24??? 25"
  // busCount: 0
  // cctvCount: 9
  // certCookerCount: 1
  // classCount: 6
  // classCount3: 2
  // classCount4: 2
  // classCount5: 2
  // classCountHandicap: 0
  // classCountMix: 0
  // classSize: 453
  // closeTime: "20???00???"
  // cookerCount: 1
  // dietianCount: 1
  // diningroomSize: 10
  // environments: []
  // establishDate: "2021-03-01"
  // establisherName: "?????????"
  // etcSize: 430
  // foodKidsCount: 111
  // foodType: "??????"
  // groundSize: 0
  // hospitalSize: 0
  // insurances: (4) [{???}, {???}, {???}, {???}]
  // kidsCount: 111
  // kinderCode: "009c017d-43bd-4d9f-ac64-d217abdd570e"
  // kinderName: "????????????????????????"
  // kinderType: "??????(??????)"
  // masterName: "?????????"
  // officeEdu: "????????????????????????"
  // openDate: null
  // openTime: "09???30???"
  // serviceCompany: null
  // studentCount3: 30
  // studentCount4: 41
  // studentCount5: 40
  // studentCountHandicap: 0
  // studentCountMix: 0
  // subOfficeEdu: "???????????????????????????"
  // tel: "02-6481-6001"
  // url: "https://www.????????????????????????.kr:497/home/"
  return (
    <div>
      <div className={classNames("flex center", classes.header)}>
        <h2>{info.kinderName}</h2>
        <div>
          <Tooltip title={"??????????????? ??????/??????"}>
            <IconButton
              onClick={() => {
                if (isInCompares()) {
                  removeCompare(info.kinderCode);
                  addToast("??????????????? ?????????????????????");
                } else {
                  addCompare(info.kinderCode);
                  addToast("???????????? ?????????????????????");
                }
              }}
            >
              <StarIcon color={isInCompares() ? "secondary" : "basic"} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className={"flex center"}>
        <TextField
          fullWidth
          style={{ flex: 1 }}
          inputRef={setInputRef}
          value={`${window.location.origin}/schools/${info.kinderCode}`}
        />
        <Tooltip title={"????????????"}>
          <IconButton
            onClick={() => {
              if (navigator.share) {
                // url: ????????? URL??? ???????????? USVString.
                // text: ????????? ????????? ???????????? USVString.
                // title: ????????? ????????? ???????????? USVString.
                navigator.share({
                  url: window.location.href,
                  title: `????????????: ${info.kinderName}`
                });
              } else if (execCopy(inputRef)) {
                addToast("??????????????? url ????????? ?????????????????????", "success");
              } else {
                addToast("??????????????? ???????????? ?????? ???????????????", "warning");
              }
            }}
          >
            <ShareIcon color={"basic"} />
          </IconButton>
        </Tooltip>
      </div>
      <Alert severity="warning">
        ?????? ????????? ??????????????? ???????????? ????????????, ???????????? ?????? ????????? ?????? ???
        ????????????
      </Alert>
      <br />
      <div className={"grid"}>
        <div>
          <Paper className={classNames("padding", classes.paper)}>
            <h3 className={classes.title}>??????</h3>
            <Map markers={[info]} highlight={info} />
          </Paper>
          <Paper className={classNames("padding", classes.paper)}>
            <h3 className={classes.title}>??????</h3>
            <Typography>{info.address}</Typography>
            <h3>????????????</h3>
            <Typography>{info.kinderType}</Typography>
            <h3>???????????????</h3>
            <Typography>
              {info.officeEdu}-{info.subOfficeEdu}
            </Typography>
            <h3>????????????</h3>
            {info.url ? (
              <a href={info.url}>{info.url}</a>
            ) : (
              <Typography>??????</Typography>
            )}
            <h3>??????</h3>
            {info.tel ? (
              <a href={`tel:${info.tel}`}>{info.tel}</a>
            ) : (
              <Typography>??????</Typography>
            )}
          </Paper>
        </div>
        <div>
          <Paper className={classNames("padding", classes.paper)}>
            <h3 className={classes.title}>????????????</h3>
            <SchoolSpecOverview school={info} />
          </Paper>
          <Paper className={classNames("padding", classes.paper)}>
            <h3 className={classes.title}>????????????</h3>
            <div>
              {(info.insurances ?? []).length ? (
                <div>
                  {info.insurances.map(insure => {
                    return (
                      <Chip
                        key={`${info.kinderCode}-insure-${insure.insureName}`}
                        icon={<FavoriteIcon />}
                        color={"primary"}
                        size={"small"}
                        className={classes.chip}
                        label={insure.insureName}
                      />
                    );
                  })}
                </div>
              ) : (
                <Typography>????????? ????????? ????????????</Typography>
              )}
            </div>
          </Paper>
          <Paper className={classNames("padding", classes.paper)}>
            <h3 className={classes.title}>??????/?????? ??????</h3>
            <TableContainer>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="right">???3???</TableCell>
                    <TableCell align="right">???4???</TableCell>
                    <TableCell align="right">???5???</TableCell>
                    <TableCell align="right">????????????</TableCell>
                    <TableCell align="right">????????????</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      ?????????
                    </TableCell>
                    <TableCell align="right">{info.classCount3}???</TableCell>
                    <TableCell align="right">{info.classCount4}???</TableCell>
                    <TableCell align="right">{info.classCount5}???</TableCell>
                    <TableCell align="right">{info.classCountMix}???</TableCell>
                    <TableCell align="right">
                      {info.classCountHandicap}???
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      ?????????
                    </TableCell>
                    <TableCell align="right">{info.studentCount3}???</TableCell>
                    <TableCell align="right">{info.studentCount4}???</TableCell>
                    <TableCell align="right">{info.studentCount5}???</TableCell>
                    <TableCell align="right">
                      {info.studentCountMix}???
                    </TableCell>
                    <TableCell align="right">
                      {info.studentCountHandicap}???
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paper className={classNames("padding", classes.paper)}>
            <h3 className={classes.title}>?????? ??????</h3>
            <TableContainer>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">???????????????</TableCell>
                    <TableCell align="left">???????????????</TableCell>
                    <TableCell align="left">??????/???????????????</TableCell>
                    <TableCell align="left">????????????</TableCell>
                    <TableCell align="left">??????????????????</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">{info.classSize ?? 0}???</TableCell>
                    <TableCell align="left">{info.groundSize ?? 0}???</TableCell>
                    <TableCell align="left">
                      {info.hospitalSize ?? 0}???
                    </TableCell>
                    <TableCell align="left">
                      {info.diningRoomSize ?? 0}???
                    </TableCell>
                    <TableCell align="left">{info.etcSize ?? 0}???</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      {((info.classSize ?? 0) / 3.306).toFixed(1)}???
                    </TableCell>
                    <TableCell align="left">
                      {((info.groundSize ?? 0) / 3.306).toFixed(1)}???
                    </TableCell>
                    <TableCell align="left">
                      {((info.hospitalSize ?? 0) / 3.306).toFixed(1)}???
                    </TableCell>
                    <TableCell align="left">
                      {((info.diningRoomSize ?? 0) / 3.306).toFixed(1)}???
                    </TableCell>
                    <TableCell align="left">
                      {((info.etcSize ?? 0) / 3.306).toFixed(1)}???
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paper className={classNames("padding", classes.paper)}>
            <h3 className={classes.title}>??????????????????</h3>
            <TableContainer>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">????????????</TableCell>
                    <TableCell align="left">?????????</TableCell>
                    <TableCell align="left">???????????????</TableCell>
                    <TableCell align="left">????????????</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">{info.foodType}</TableCell>
                    <TableCell align="left">{info.dietianCount}???</TableCell>
                    <TableCell align="left">{info.certCookerCount}???</TableCell>
                    <TableCell align="left">{info.cookerCount}???</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          {violations && (
            <Paper className={classNames("padding", classes.paper)}>
              <h3>????????????</h3>
              <Typography>??????????????? {violations.length}??? ????????????</Typography>
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(SchoolInfo);
