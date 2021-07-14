import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import styles from "../containers/SearchFilter/SearchFilter.module.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { useToasts } from "../hook/useToast";
import { createReport } from "../http";

const Report = ({ history }) => {
  const [report, setReport] = useState({});
  const [_, addToast] = useToasts();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const unblock = history.block(
      "문의 작성 중 입니다. 페이지를 벗어나시겠습니까?"
    );
    return () => {
      unblock();
    };
  }, []);
  useEffect(() => {
    console.log(report);
  }, [report]);
  const handleChange = e => {
    setReport({
      ...report,
      [e.target.name]: e.target.value
    });
  };
  const submit = () => {
    const { email, title, content } = report;
    if (!title || !content) {
      addToast("제목과 내용을 모두 입력하세요", "warning");
      return;
    }
    createReport(email, title, content)
      .then(res => {
        addToast("접수되었습니다");
        history.replace("/");
      })
      .catch(e => {
        addToast("문의를 접수하는데 오류가 발생했습니다", "error");
      });
  };
  return (
    <div className={"content"}>
      <h1>문의</h1>
      <br />
      <h3>답장 받을 이메일</h3>
      <FormControl className={styles.form} fullWidth>
        <TextField
          name={"email"}
          type={"email"}
          label="example@exam.com"
          onChange={handleChange}
        />
      </FormControl>
      <h3>제목</h3>
      <FormControl className={styles.form} fullWidth>
        <TextField
          name={"title"}
          type={"text"}
          label="문의제목"
          onChange={handleChange}
        />
      </FormControl>
      <h3>내용</h3>
      <FormControl className={styles.form} fullWidth>
        <TextField
          multiline
          name={"content"}
          type={"textarea"}
          label="문의내용"
          onChange={handleChange}
          rows={10}
        />
      </FormControl>
      <br />
      <br />
      <Button variant={"contained"} color={"primary"} onClick={submit}>
        접수
      </Button>
    </div>
  );
};

export default Report;
