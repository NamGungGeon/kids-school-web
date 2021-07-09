import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { observable } from "mobx";
import { observer } from "mobx-react-lite";
import { useModal } from "../hook/useModal";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "90%",
    maxWidth: "1024px",
    maxHeight: "800px",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}));
const WithModal = WrappedComponent => {
  const Component = props => {
    const classes = useStyles();
    const [body, setBody] = useModal();
    return (
      <>
        <Modal open={body} onClose={() => setBody(null)}>
          <div className={classes.paper}>{body}</div>
        </Modal>
        <WrappedComponent {...props} />
      </>
    );
  };
  return observer(Component);
};

export default WithModal;
