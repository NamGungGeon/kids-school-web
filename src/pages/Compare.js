import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { useModal } from "../hook/useModal";
import SchoolInfo from "../containers/SchoolInfo/SchoolInfo";
import Alert from "@material-ui/lab/Alert";
import ComparableList from "../containers/ComparableList/ComparableList";
import queryString from "query-string";
import { getSchoolsByCodes } from "../http";
import CompareSchools from "../containers/CompareSchools/CompareSchools";
import { useDeviceType } from "../hook/useDeviceSize";
import classNames from "classnames";
import { Button, Input } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import { useToasts } from "../hook/useToast";
import TextField from "@material-ui/core/TextField";
import InputBase from "@material-ui/core/InputBase";
import { usePageDescriptor } from "../hook/usePageDescriptor";
import {useCompares} from "../hook/useCompares";

const colors = ["#2196F3", "#D32F2F", "#9C27B0", "#651FFF", "#E91E63"];
const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5),
    marginLeft: 0
  }
}));

const Compare = ({ location, history }) => {
  const classes = useStyles();
  const [_, setModal] = useModal();
  const [__, addToast] = useToasts();
  const [compares, setCompares] = useState([]);
  const [comparables] = useCompares();
  const [device] = useDeviceType();
  const [clipboard, setClipboard] = useState();
  usePageDescriptor({
    title: "키즈스쿨:: 비교",
    description: "유치원을 비교합니다"
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const execCopy = () => {
    if (!document.queryCommandSupported("copy")) {
      return false;
    }
    if (clipboard) {
      clipboard.focus();
      clipboard.select();
      document.execCommand("copy");
      return true;
    }

    return false;
  };
  useEffect(() => {
    if (compares.length < 2) {
      addToast(`2개 이상의 유치원을 선택하면 비교가 시작됩니다`);
    }
  }, [compares]);
  useEffect(() => {
    const presets = queryString.parse(location.search).presets?.split(",");
    console.log("presets", presets);
    if (presets) {
      getSchoolsByCodes(presets)
        .then(res => {
          const { schools } = res.data;
          setCompares(schools);
        })
        .catch(console.error);
    }
  }, [location.search]);
  useEffect(()=>{
    const query = queryString.parse(location.search);
    if(comparables.length=== 0 && !query.preview){
      //test mode on
      history.replace('/compare?presets=009c017d-43bd-4d9f-ac64-d217abdd570e,1ecec08c-ed94-b044-e053-0a32095ab044,04a021da-cdd7-4e7e-a434-2b388c2f6b63&preview=true')
    }
  }, [comparables, location.search])

  const previewMode = queryString.parse(location.search).preview;
  return (
    <div className={"content"}>
      {device !== "phone" && <h1>유치원 비교</h1>}
      <ComparableList
        onUpdateCompares={compares => {
          history.replace(
            `/compare?presets=${compares.map(c => c.kinderCode).join(",")}`
          );
        }}
        initCompares={compares}
      />
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
          {
            previewMode && <Alert severity={'success'}>
              비교함에 유치원을 추가한 후 아래와 같이 비교할 수 있습니다
            </Alert>
          }
          <Alert severity="warning">
            해당 정보는 정보공시일 기준으로 제공되며, 현재와는 다른 내용이 있을
            수 있습니다
          </Alert>
          <br />
          <div
            className={classNames({
              infoBox: device === "phone"
            })}
          >
            <div className={"flex center"}>
              <TextField
                size={device === "phone" ? "small" : "medium"}
                style={{ flex: 1 }}
                inputRef={setClipboard}
                value={`${window.location.origin}${
                  window.location.pathname
                }?presets=${compares.map(c => c.kinderCode).join(",")}`}
              />
              <Button
                size={device === "phone" ? "small" : "medium"}
                onClick={() => {
                  if (execCopy()) {
                    addToast(
                      "비교중인 리스트를 공유할 수 있는 링크가 클립보드에 복사되었습니다",
                      "success"
                    );
                  } else {
                    addToast("클립보드를 사용할 수 없는 환경입니다", "error");
                  }
                }}
                variant={"outlined"}
                color={"primary"}
                startIcon={<ShareIcon />}
              >
                비교중인 항목 공유하기
              </Button>
            </div>
            <br />
            {compares.map((school, idx) => {
              return (
                <Chip
                  size={device === "phone" ? "small" : "medium"}
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
          <br/>
          <CompareSchools schools={compares} />
        </Paper>
      )}
      <div style={{ height: "128px" }} />
    </div>
  );
};

export default Compare;
