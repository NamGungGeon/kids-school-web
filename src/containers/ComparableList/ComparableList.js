import React, { useEffect, useState } from "react";
import { useCompares } from "../../hook/useCompares";
import { useDeviceType } from "../../hook/useDeviceSize";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import Loading from "../../components/Loading/Loading";
import { getSchoolsByCodes } from "../../http";
import { observer } from "mobx-react-lite";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { Button, useTheme } from "@material-ui/core";
import { useModal } from "../../hook/useModal";

const RemoveDialog = observer(({ school, onClose }) => {
  const [_, __, removeCompare] = useCompares();
  const [device] = useDeviceType();
  return (
    <div>
      {device === "desktop" ? (
        <h2>{school.kinderName}을 비교함에서 삭제하시겠습니까?</h2>
      ) : (
        <p>{school.kinderName}을 비교함에서 삭제하시겠습니까?</p>
      )}
      <div style={{ textAlign: "right" }}>
        <Button
          color={"secondary"}
          size={"small"}
          onClick={e => {
            removeCompare(school.kinderCode);
            onClose();
          }}
        >
          삭제
        </Button>
        &nbsp;
        <Button size={"small"}>취소</Button>
      </div>
    </div>
  );
});
const ComparableList = ({
  onUpdateCompares = compares => {},
  initCompares = [],
  onEmptyComparables = (
    <Typography>
      2개 이상의 유치원/어린이집이 비교함에 담겨 있어야 합니다
    </Typography>
  )
}) => {
  const [schools, setSchools] = useState();
  const [comparables] = useCompares();
  const [modal, setModal] = useModal();
  const [expanded, setExpanded] = useState(true);
  const [compares, setCompares] = useState(initCompares);
  const [type] = useDeviceType();
  const theme = useTheme();
  const { palette } = theme;

  useEffect(() => {
    onUpdateCompares(compares);
  }, [compares]);
  useEffect(() => {
    if (comparables.length >= 2)
      getSchoolsByCodes(comparables)
        .then(res => {
          const { schools } = res.data;
          setSchools(schools);
        })
        .catch(console.error);
  }, [comparables]);

  if (comparables.length < 2) {
    return onEmptyComparables;
  }
  if (comparables.length >= 2 && !schools) {
    return <Loading />;
  }
  return (
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
                  style={
                    type === "phone" && compares.indexOf(school) !== -1
                      ? { borderLeft: `2px solid ${palette.primary.main}` }
                      : {}
                  }
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
                  {type !== "phone" && (
                    <ListItemIcon>
                      <ChildCareIcon />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    primary={
                      <b
                        style={
                          type === "phone" && compares.indexOf(school) !== -1
                            ? { color: palette.primary.main }
                            : {}
                        }
                      >
                        {type === "phone" &&
                          compares.indexOf(school) !== -1 && (
                            <span>(선택됨)</span>
                          )}
                        {school.kinderName}
                      </b>
                    }
                    secondary={school.address}
                  />
                  <ListItemSecondaryAction>
                    {type !== "phone" && (
                      <Checkbox
                        checked={compares.indexOf(school) !== -1}
                        onClick={e => {
                          e.stopPropagation();
                          const target = compares.indexOf(school);
                          if (target === -1) {
                            setCompares([...compares, school]);
                          } else {
                            setCompares(
                              [...compares].filter(c => c !== school)
                            );
                          }
                        }}
                      />
                    )}
                    <Tooltip title={"삭제"}>
                      <IconButton
                        onClick={() => {
                          setModal(
                            <RemoveDialog
                              school={school}
                              onClose={() => setModal(null)}
                            />
                          );
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default observer(ComparableList);
