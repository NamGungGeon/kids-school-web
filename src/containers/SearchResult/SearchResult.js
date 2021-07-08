import React from "react";
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

const SearchResult = () => {
  const classes = useStyles();
  return (
    <div>
      <div component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="검색할 유치원의 이름을 입력하세요"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </div>
      <Divider />
      <List
        style={{
          maxHeight: "450px",
          overflow: "auto"
        }}
      >
        {Array(8)
          .fill(0)
          .map(() => {
            return (
              <ListItem button>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="Sent mail" secondary={"hh"} />
              </ListItem>
            );
          })}
      </List>
    </div>
  );
};

export default SearchResult;
