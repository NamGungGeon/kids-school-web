import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { useModal } from "../hook/useModal";
import SchoolInfo from "../containers/SchoolInfo/SchoolInfo";
import { observer } from "mobx-react-lite";
import SchoolSpecOverview from "../containers/SchoolSpecOverview/SchoolSpecOverview";
import Map from "../components/Map/Map";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Alert from "@material-ui/lab/Alert";
import ComparableList from "../containers/ComparableList/ComparableList";

const colors = ["#2196F3", "#D32F2F", "#9C27B0", "#651FFF", "#E91E63"];
const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5),
    marginLeft: 0
  }
}));

const SchoolSection = ({ color, header, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        borderLeft: `4px solid ${color}`,
        padding: "8px",
        marginBottom: "2px",
        cursor: onClick ? "pointer" : "default"
      }}
    >
      <h3 style={{ color, margin: 0, marginBottom: "8px" }}>{header}</h3>
      <div>{children}</div>
    </div>
  );
};
const Compare = () => {
  const classes = useStyles();
  const [_, setModal] = useModal();
  const [compares, setCompares] = useState([]);
  const [highlight, setHighlight] = useState();
  useEffect(() => {
    setHighlight(null);
  }, [compares]);
  return (
    <div className={"content"}>
      <h1>유치원 비교</h1>
      <ComparableList onUpdateCompares={setCompares} />
      <br />
      {compares.length > colors.length && (
        <Typography>
          비교는 한 번에 {colors.length}개까지만 할 수 있습니다
          <br />
          (현재 {compares.length}개 선택됨)
        </Typography>
      )}
      {compares.length >= 2 && compares.length <= colors.length && (
        <Paper className={"padding"}>
          <Alert severity="warning">
            해당 정보는 정보공시일 기준으로 제공되며, 현재와는 다른 내용이 있을
            수 있습니다
          </Alert>
          <br />
          <div>
            {compares.map((school, idx) => {
              return (
                <Chip
                  key={`compare-${school.kinderCode}`}
                  onClick={() => {
                    setModal(<SchoolInfo kinderCode={school.kinderCode} />);
                  }}
                  style={{
                    background: colors[idx],
                    color: "white"
                  }}
                  className={classes.chip}
                  icon={<ChildCareIcon style={{ color: "white" }} />}
                  label={school.kinderName}
                  onDelete={() => {
                    setCompares([...compares].filter(c => c !== school));
                  }}
                />
              );
            })}
          </div>
          <div className={"grid"}>
            <div>
              <div>
                <h2>요약</h2>
                <div>
                  {compares.map((school, idx) => {
                    return (
                      <SchoolSection
                        key={`compare-overview-${school.kinderCode}`}
                        color={colors[idx]}
                        header={school.kinderName}
                      >
                        <SchoolSpecOverview
                          school={school}
                          color={colors[idx]}
                        />
                      </SchoolSection>
                    );
                  })}
                </div>
              </div>
              <div>
                <h2>위치</h2>
                <div>
                  <div style={{ padding: "8px" }}>
                    <Map markers={compares} highlight={highlight} />
                  </div>
                  {compares.map((school, idx) => {
                    return (
                      <SchoolSection
                        onClick={e => setHighlight(school)}
                        key={`compare-address-${school.kinderCode}`}
                        color={colors[idx]}
                        header={school.kinderName}
                      >
                        {school.address}
                      </SchoolSection>
                    );
                  })}
                </div>
              </div>
              <div>
                <h2>기본정보</h2>
                <div>
                  {compares.map((school, idx) => {
                    return (
                      <SchoolSection
                        key={`compare-basics-${school.kinderCode}`}
                        color={colors[idx]}
                        header={school.kinderName}
                      >
                        <TableContainer>
                          <Table
                            className={classes.table}
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableBody>
                              <TableRow>
                                <TableCell align="left">
                                  <b>설립형태</b>
                                </TableCell>
                                <TableCell align="right">
                                  {school.kinderType}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">
                                  <b>담당교육청</b>
                                </TableCell>
                                <TableCell align="right">
                                  {school.officeEdu}-{school.subOfficeEdu}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">
                                  <b>홈페이지</b>
                                </TableCell>
                                <TableCell align="right">
                                  {school.url ? (
                                    <a href={school.url}>{school.url}</a>
                                  ) : (
                                    <Typography>없음</Typography>
                                  )}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">
                                  <b>전화</b>
                                </TableCell>
                                <TableCell align="right">
                                  {school.tel ? (
                                    <a href={`tel:${school.tel}`}>
                                      {school.tel}
                                    </a>
                                  ) : (
                                    <Typography>없음</Typography>
                                  )}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </SchoolSection>
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <div>
                <h2>보험정보</h2>
                <div>
                  {compares.map((school, idx) => {
                    return (
                      <SchoolSection
                        key={`compare-insurance-${school.kinderCode}`}
                        color={colors[idx]}
                        header={school.kinderName}
                      >
                        {(school.insurances ?? []).length ? (
                          <div>
                            {school.insurances.map(insure => {
                              return (
                                <Chip
                                  style={{ background: colors[idx] }}
                                  key={`${school.kinderCode}-insure-${insure.insureName}`}
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
                      </SchoolSection>
                    );
                  })}
                </div>
              </div>
              <div>
                <h2>학급정보</h2>
                <div>
                  {compares.map((school, idx) => {
                    return (
                      <SchoolSection
                        key={`compare-class-${school.kinderCode}`}
                        color={colors[idx]}
                        header={school.kinderName}
                      >
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
                                <TableCell align="right">
                                  {school.classCount3}개
                                </TableCell>
                                <TableCell align="right">
                                  {school.classCount4}개
                                </TableCell>
                                <TableCell align="right">
                                  {school.classCount5}개
                                </TableCell>
                                <TableCell align="right">
                                  {school.classCountMix}개
                                </TableCell>
                                <TableCell align="right">
                                  {school.classCountHandicap}개
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell component="th" scope="row">
                                  학생수
                                </TableCell>
                                <TableCell align="right">
                                  {school.studentCount3}명
                                </TableCell>
                                <TableCell align="right">
                                  {school.studentCount4}명
                                </TableCell>
                                <TableCell align="right">
                                  {school.studentCount5}명
                                </TableCell>
                                <TableCell align="right">
                                  {school.studentCountMix}명
                                </TableCell>
                                <TableCell align="right">
                                  {school.studentCountHandicap}명
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </SchoolSection>
                    );
                  })}
                </div>
              </div>
              <div>
                <h2>공간정보</h2>
                <div>
                  {compares.map((school, idx) => {
                    return (
                      <SchoolSection
                        key={`compare-cctv-${school.kinderCode}`}
                        color={colors[idx]}
                        header={school.kinderName}
                      >
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
                                <TableCell align="left">
                                  보건/위생실면적
                                </TableCell>
                                <TableCell align="left">주방면적</TableCell>
                                <TableCell align="left">기타공간면적</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                                <TableCell align="left">
                                  {school.classSize ?? 0}㎡
                                </TableCell>
                                <TableCell align="left">
                                  {school.groundSize ?? 0}㎡
                                </TableCell>
                                <TableCell align="left">
                                  {school.hospitalSize ?? 0}㎡
                                </TableCell>
                                <TableCell align="left">
                                  {school.diningRoomSize ?? 0}㎡
                                </TableCell>
                                <TableCell align="left">
                                  {school.etcSize ?? 0}㎡
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left">
                                  {((school.classSize ?? 0) / 3.306).toFixed(1)}
                                  평
                                </TableCell>
                                <TableCell align="left">
                                  {((school.groundSize ?? 0) / 3.306).toFixed(
                                    1
                                  )}
                                  평
                                </TableCell>
                                <TableCell align="left">
                                  {((school.hospitalSize ?? 0) / 3.306).toFixed(
                                    1
                                  )}
                                  평
                                </TableCell>
                                <TableCell align="left">
                                  {(
                                    (school.diningRoomSize ?? 0) / 3.306
                                  ).toFixed(1)}
                                  평
                                </TableCell>
                                <TableCell align="left">
                                  {((school.etcSize ?? 0) / 3.306).toFixed(1)}평
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </SchoolSection>
                    );
                  })}
                </div>
              </div>
              <div>
                <h2>급식운영</h2>
                <div>
                  {compares.map((school, idx) => {
                    return (
                      <SchoolSection
                        key={`compare-foodType-${school.kinderCode}`}
                        color={colors[idx]}
                        header={school.kinderName}
                      >
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
                                <TableCell align="left">
                                  {school.foodType}
                                </TableCell>
                                <TableCell align="left">
                                  {school.dietianCount}명
                                </TableCell>
                                <TableCell align="left">
                                  {school.certCookerCount}명
                                </TableCell>
                                <TableCell align="left">
                                  {school.cookerCount}명
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </SchoolSection>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default observer(Compare);
