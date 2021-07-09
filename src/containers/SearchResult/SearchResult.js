import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SendIcon from "@material-ui/icons/Send";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { useModal } from "../../hook/useModal";
import SchoolInfo from "../SchoolInfo/SchoolInfo";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const SearchResult = ({ schools }) => {
  const [modal, setModal] = useModal();

  if (!schools)
    return (
      <div className={"flex center"}>
        <CircularProgress />
      </div>
    );
  if (schools && !schools.length)
    return (
      <div className={"flex center"} style={{ height: "100%" }}>
        <Typography>검색 결과가 없습니다</Typography>
      </div>
    );

  return (
    <div>
      <List
        style={{
          maxHeight: "500px",
          overflow: "auto"
        }}
      >
        {schools?.map(school => {
          return (
            <ListItem button>
              <ListItemIcon>
                <ChildCareIcon />
              </ListItemIcon>
              <ListItemText
                primary={school.kinderName}
                secondary={school.address}
              />
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() => {
                    setModal(<SchoolInfo kinderCode={school.kinderCode} />);
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default SearchResult;
