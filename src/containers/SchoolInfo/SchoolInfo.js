import React, { useEffect, useState } from "react";
import { getSchoolInfo } from "../../http";
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

const useStyles = makeStyles(theme => ({
  header: {
    justifyContent: "space-between"
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
const SchoolInfo = ({ kinderCode, school = null }) => {
  const classes = useStyles();
  const [info, setInfo] = useState(school);
  const [_, addToast] = useToasts();
  const [compares, addCompare, removeCompare] = useCompares();
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
    console.log("info", info);
  }, [info]);

  if (!info) return <Loading />;
  //info
  // address: "서울특별시 송파구 오금로24길 25"
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
  // closeTime: "20시00분"
  // cookerCount: 1
  // dietianCount: 1
  // diningroomSize: 10
  // environments: []
  // establishDate: "2021-03-01"
  // establisherName: "이수이"
  // etcSize: 430
  // foodKidsCount: 111
  // foodType: "직영"
  // groundSize: 0
  // hospitalSize: 0
  // insurances: (4) [{…}, {…}, {…}, {…}]
  // kidsCount: 111
  // kinderCode: "009c017d-43bd-4d9f-ac64-d217abdd570e"
  // kinderName: "서울솔방울유치원"
  // kinderType: "공립(단설)"
  // masterName: "이수이"
  // officeEdu: "서울특별시교육청"
  // openDate: null
  // openTime: "09시30분"
  // serviceCompany: null
  // studentCount3: 30
  // studentCount4: 41
  // studentCount5: 40
  // studentCountHandicap: 0
  // studentCountMix: 0
  // subOfficeEdu: "강동송파교육지원청"
  // tel: "02-6481-6001"
  // url: "https://www.서울솔방울유치원.kr:497/home/"
  return (
    <div>
      <div className={classNames("flex center", classes.header)}>
        <h2>{info.kinderName}</h2>
        <div>
          <Tooltip title={"비교함에서 추가/제거"}>
            <IconButton
              onClick={() => {
                if (isInCompares()) {
                  removeCompare(info.kinderCode);
                  addToast("비교함에서 제거되었습니다");
                } else {
                  addCompare(info.kinderCode);
                  addToast("비교함에 추가되었습니다");
                }
              }}
            >
              <StarIcon color={isInCompares() ? "secondary" : "basic"} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <Alert severity="warning">
        해당 정보는 정보공시일 기준으로 제공되며, 현재와는 다른 내용이 있을 수
        있습니다
      </Alert>
      <br />
      <div className={"grid"}>
        <div>
          <Paper className={classNames("padding", classes.paper)}>
            <h3 className={classes.title}>지도</h3>
            <Map markers={[info]} highlight={info} />
          </Paper>
          <Paper className={classNames("padding", classes.paper)}>
            <h3 className={classes.title}>주소</h3>
            <Typography>{info.address}</Typography>
            <h3>설립형태</h3>
            <Typography>{info.kinderType}</Typography>
            <h3>담당교육청</h3>
            <Typography>
              {info.officeEdu}-{info.subOfficeEdu}
            </Typography>
            <h3>홈페이지</h3>
            {info.url ? (
              <a href={info.url}>{info.url}</a>
            ) : (
              <Typography>없음</Typography>
            )}
            <h3>전화</h3>
            {info.tel ? (
              <a href={`tel:${info.tel}`}>{info.tel}</a>
            ) : (
              <Typography>없음</Typography>
            )}
          </Paper>
        </div>
        <div>
          <Paper className={classNames("padding", classes.paper)}>
            <h3 className={classes.title}>편의시설</h3>
            <SchoolSpecOverview school={info} />
          </Paper>
          <Paper className={classNames("padding", classes.paper)}>
            <h3 className={classes.title}>보험가입</h3>
            <div>
              {(info.insurances ?? []).length ? (
                <div>
                  {info.insurances.map(insure => {
                    return (
                      <Chip
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
                <Typography>가입된 보험이 없습니다</Typography>
              )}
            </div>
          </Paper>
          <Paper className={classNames("padding", classes.paper)}>
            <h3 className={classes.title}>학생/학급 정보</h3>
            <TableContainer>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell align="right">만3세</TableCell>
                    <TableCell align="right">만4세</TableCell>
                    <TableCell align="right">만5세</TableCell>
                    <TableCell align="right">혼합학급</TableCell>
                    <TableCell align="right">특수학급</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      학급수
                    </TableCell>
                    <TableCell align="right">{info.classCount3}개</TableCell>
                    <TableCell align="right">{info.classCount4}개</TableCell>
                    <TableCell align="right">{info.classCount5}개</TableCell>
                    <TableCell align="right">{info.classCountMix}개</TableCell>
                    <TableCell align="right">
                      {info.classCountHandicap}개
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      학생수
                    </TableCell>
                    <TableCell align="right">{info.studentCount3}명</TableCell>
                    <TableCell align="right">{info.studentCount4}명</TableCell>
                    <TableCell align="right">{info.studentCount5}명</TableCell>
                    <TableCell align="right">
                      {info.studentCountMix}명
                    </TableCell>
                    <TableCell align="right">
                      {info.studentCountHandicap}명
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paper className={classNames("padding", classes.paper)}>
            <h3 className={classes.title}>공간 정보</h3>
            <TableContainer>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">교실총면적</TableCell>
                    <TableCell align="left">운동장면적</TableCell>
                    <TableCell align="left">보건/위생실면적</TableCell>
                    <TableCell align="left">주방면적</TableCell>
                    <TableCell align="left">기타공간면적</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">{info.classSize ?? 0}㎡</TableCell>
                    <TableCell align="left">{info.groundSize ?? 0}㎡</TableCell>
                    <TableCell align="left">
                      {info.hospitalSize ?? 0}㎡
                    </TableCell>
                    <TableCell align="left">
                      {info.diningRoomSize ?? 0}㎡
                    </TableCell>
                    <TableCell align="left">{info.etcSize ?? 0}㎡</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">
                      {((info.classSize ?? 0) / 3.306).toFixed(1)}평
                    </TableCell>
                    <TableCell align="left">
                      {((info.groundSize ?? 0) / 3.306).toFixed(1)}평
                    </TableCell>
                    <TableCell align="left">
                      {((info.hospitalSize ?? 0) / 3.306).toFixed(1)}평
                    </TableCell>
                    <TableCell align="left">
                      {((info.diningRoomSize ?? 0) / 3.306).toFixed(1)}평
                    </TableCell>
                    <TableCell align="left">
                      {((info.etcSize ?? 0) / 3.306).toFixed(1)}평
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Paper className={classNames("padding", classes.paper)}>
            <h3 className={classes.title}>급식운영정보</h3>
            <TableContainer>
              <Table
                className={classes.table}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">운영형태</TableCell>
                    <TableCell align="left">영양사</TableCell>
                    <TableCell align="left">전문조리사</TableCell>
                    <TableCell align="left">조리인력</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="left">{info.foodType}</TableCell>
                    <TableCell align="left">{info.dietianCount}명</TableCell>
                    <TableCell align="left">{info.certCookerCount}명</TableCell>
                    <TableCell align="left">{info.cookerCount}명</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default SchoolInfo;
