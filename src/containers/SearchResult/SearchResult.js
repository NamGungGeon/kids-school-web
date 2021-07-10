import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useModal } from "../../hook/useModal";
import SchoolInfo from "../SchoolInfo/SchoolInfo";
import Typography from "@material-ui/core/Typography";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import { useCompares } from "../../hook/useCompares";
import Loading from "../../components/Loading/Loading";
import StarIcon from "@material-ui/icons/Star";
import { useToasts } from "../../hook/useToast";
import Tooltip from "@material-ui/core/Tooltip";

const SearchResult = ({ schools }) => {
  const [modal, setModal] = useModal();
  const [compares, addCompare, removeCompare] = useCompares();
  const [_, addToast] = useToasts();
  const isInCompares = kinderCode => {
    return compares.indexOf(kinderCode) !== -1;
  };

  if (!schools) return <Loading />;
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
                <Tooltip title={"비교함에서 추가/제거"}>
                  <IconButton
                    onClick={() => {
                      if (isInCompares(school.kinderCode)) {
                        removeCompare(school.kinderCode);
                        addToast("비교함에서 제거되었습니다");
                      } else {
                        addCompare(school.kinderCode);
                        addToast("비교함에 추가되었습니다");
                      }
                    }}
                  >
                    <StarIcon
                      color={
                        isInCompares(school.kinderCode) ? "secondary" : "basic"
                      }
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip title={"자세히 보기"}>
                  <IconButton
                    onClick={() => {
                      setModal(<SchoolInfo kinderCode={school.kinderCode} />);
                    }}
                  >
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default SearchResult;
