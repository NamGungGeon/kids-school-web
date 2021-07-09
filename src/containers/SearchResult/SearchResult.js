import React, { useEffect, useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SendIcon from "@material-ui/icons/Send";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import withModal from "../../hoc/withModal";
import { useModal } from "../../hook/useModal";
import SchoolInfo from "../SchoolInfo/SchoolInfo";
import { getSchoolsByAddress } from "../../http";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    height: 28,
    margin: 4
  }
}));

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
            <ListItem
              button
              onClick={() => {
                setModal(<SchoolInfo kinderCode={school.kinderCode} />);
              }}
            >
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText
                primary={school.kinderName}
                secondary={school.address}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default SearchResult;
