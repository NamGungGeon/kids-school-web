import React, { useEffect, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import { useCompares } from "../hook/useCompares";
import { getSchoolsByCodes } from "../http";
import Loading from "../components/Loading/Loading";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import { useModal } from "../hook/useModal";
import SchoolInfo from "../containers/SchoolInfo/SchoolInfo";

const colors = ["#2196F3", "#D32F2F", "#9C27B0", "#651FFF", "#E91E63"];
const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5),
    marginLeft: 0
  }
}));

const SchoolSection = ({ color, header, children }) => {
  return (
    <div
      style={{
        borderLeft: `4px solid ${color}`,
        padding: "8px",
        marginBottom: "2px"
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
  const [schools, setSchools] = useState();
  const [comparables] = useCompares();
  const [expanded, setExpanded] = useState(true);
  const [compares, setCompares] = useState([]);
  useEffect(() => {
    if (comparables.length >= 2)
      getSchoolsByCodes(comparables)
        .then(res => {
          const { schools } = res.data;
          setSchools(schools);
        })
        .catch(console.error);
  }, [comparables]);
  if (comparables.length >= 2 && !schools) {
    return <Loading />;
  }
  return (
    <div className={"content"}>
      <h1>유치원 비교</h1>
      {comparables.length < 2 && (
        <Typography>
          2개 이상의 유치원/어린이집이 비교함에 담겨 있어야 합니다
        </Typography>
      )}
      {comparables.length > 0 && (
        <Accordion
          expanded={expanded}
          onChange={(_, expanded) => {
            if (!compares) {
              setExpanded(true);
            } else {
              setExpanded(expanded);
            }
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              <b>비교 유치원 선택</b>
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <List>
                {schools.map((school, idx) => {
                  return (
                    <ListItem
                      key={`comparable-${school.kinderCode}`}
                      button
                      onClick={e => {
                        const target = compares.indexOf(school);
                        if (target === -1) {
                          setCompares([...compares, school]);
                        } else {
                          setCompares([...compares].filter(c => c !== school));
                        }
                      }}
                    >
                      <ListItemIcon>
                        <ChildCareIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={school.kinderName}
                        secondary={school.address}
                      />
                      <ListItemSecondaryAction>
                        <Checkbox checked={compares.indexOf(school) !== -1} />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </div>
          </AccordionDetails>
        </Accordion>
      )}
      <br />
      {compares.length > colors.length && (
        <Typography>
          비교는 한 번에 {colors.length}개까지만 할 수 있습니다
        </Typography>
      )}
      {compares.length >= 2 && colors.length && (
        <Paper className={"padding"}>
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
                  color={colors[idx]}
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
              <h2>위치</h2>
              <div>
                {compares.map((school, idx) => {
                  return (
                    <SchoolSection
                      key={`compare-address-${school.kinderCode}`}
                      color={colors[idx]}
                      header={school.kinderName}
                    >
                      ㅇㅇ
                    </SchoolSection>
                  );
                })}
              </div>
            </div>
            <div>
              <h2>거리</h2>
              <div>
                {compares.map((school, idx) => {
                  return (
                    <SchoolSection
                      key={`compare-distance-${school.kinderCode}`}
                      color={colors[idx]}
                      header={school.kinderName}
                    >
                      ㅇㅇ
                    </SchoolSection>
                  );
                })}
              </div>
            </div>
            <div>
              <h2>설립형태</h2>
              <div>
                {compares.map((school, idx) => {
                  return (
                    <SchoolSection
                      key={`compare-kinderType-${school.kinderCode}`}
                      color={colors[idx]}
                      header={school.kinderName}
                    >
                      ㅇㅇ
                    </SchoolSection>
                  );
                })}
              </div>
            </div>
            <div>
              <h2>운영시간</h2>
              <div>
                {compares.map((school, idx) => {
                  return (
                    <SchoolSection
                      key={`compare-times-${school.kinderCode}`}
                      color={colors[idx]}
                      header={school.kinderName}
                    >
                      ㅇㅇ
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
                      ㅇㅇ
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
                      ㅇㅇ
                    </SchoolSection>
                  );
                })}
              </div>
            </div>
            <div>
              <h2>스쿨버스 운영</h2>
              <div>
                {compares.map((school, idx) => {
                  return (
                    <SchoolSection
                      key={`compare-bus-${school.kinderCode}`}
                      color={colors[idx]}
                      header={school.kinderName}
                    >
                      ㅇㅇ
                    </SchoolSection>
                  );
                })}
              </div>
            </div>
            <div>
              <h2>CCTV 운영</h2>
              <div>
                {compares.map((school, idx) => {
                  return (
                    <SchoolSection
                      key={`compare-cctv-${school.kinderCode}`}
                      color={colors[idx]}
                      header={school.kinderName}
                    >
                      ㅇㅇ
                    </SchoolSection>
                  );
                })}
              </div>
            </div>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default Compare;
