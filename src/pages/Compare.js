import React, { useEffect, useState } from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import SearchFilter from "../containers/SearchFilter/SearchFilter";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SendIcon from "@material-ui/icons/Send";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import { Button } from "@material-ui/core";

const Compare = () => {
  const [expanded, setExpanded] = useState(true);
  const [comparables, setComparables] = useState([]);
  const [compares, setCompares] = useState();
  useEffect(() => {
    console.log("comparables", comparables);
  }, [comparables]);
  return (
    <div className={"content"}>
      <h1>유치원 비교</h1>
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
          <Typography>비교 유치원 선택</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: "100%" }}>
            <List>
              {Array(8)
                .fill(0)
                .map((_, idx) => {
                  return (
                    <ListItem
                      button
                      onClick={e => {
                        const target = comparables.indexOf(idx);
                        if (target === -1) {
                          setComparables([...comparables, idx]);
                        } else {
                          setComparables(
                            [...comparables].filter(c => c !== idx)
                          );
                        }
                      }}
                    >
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="end"
                          checked={comparables.indexOf(idx) !== -1}
                        />
                      </ListItemSecondaryAction>
                      <ListItemText primary="Sent mail" secondary={"hh"} />
                    </ListItem>
                  );
                })}
            </List>
            <div style={{ textAlign: "right" }}>
              <Button
                color={"primary"}
                variant={"outlined"}
                size={"large"}
                onClick={e => {
                  if (comparables.length >= 2) {
                    setExpanded(false);
                    setCompares(comparables);
                  } else {
                    console.log("2개 이상의 비교 대상이 지정되어야 합니다");
                  }
                }}
              >
                비교 시작
              </Button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <br />
      {compares && (
        <Paper className={"padding"}>
          <h2>위치</h2>
          <div>
            <p>ㅇㅇ</p>
          </div>
          <h2>거리</h2>
          <div>
            <p>ㅇㅇ</p>
          </div>
          <h2>설립형태</h2>
          <div>
            <p>ㅇㅇ</p>
          </div>
          <h2>운영시간</h2>
          <div>
            <p>ㅇㅇ</p>
          </div>
          <h2>학급정보</h2>
          <div>
            <p>ㅇㅇ</p>
          </div>
          <h2>급식운영</h2>
          <div>
            <p>ㅇㅇ</p>
          </div>
          <h2>스쿨버스 운영</h2>
          <div>
            <p>ㅇㅇ</p>
          </div>
          <h2>CCTV 운영</h2>
          <div>
            <p>ㅇㅇ</p>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default Compare;
