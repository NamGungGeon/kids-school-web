import React, { createRef, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import SearchFilter from "../containers/SearchFilter/SearchFilter";
import SearchResult from "../containers/SearchResult/SearchResult";
import { getSchoolsByAddress, getSchoolsByName } from "../http";
import Map from "../components/Map/Map";

const Home = () => {
  const [schools, setSchools] = useState([]);
  const [filter, setFilter] = useState({});
  const [expanded, setExpanded] = useState(true);
  useEffect(() => {
    const { sidoName, sggName } = filter;
    console.log("filter updated", filter);
    if (sidoName && sggName) {
      getSchoolsByAddress(sidoName, sggName, filter)
        .then(res => {
          setSchools(res.data.schools);
        })
        .catch(console.error);
    } else if (filter.kinderName?.length >= 3) {
      getSchoolsByName(filter.kinderName)
        .then(res => {
          setSchools(res.data.schools);
        })
        .catch(console.error);
    }
  }, [filter]);
  return (
    <div className={"content"}>
      <h1>유치원 찾기</h1>
      <Accordion
        expanded={expanded}
        onChange={(_, expanded) => {
          console.log("expanded", expanded);
          setExpanded(expanded);
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>검색 옵션 설정</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SearchFilter onUpdate={filter => setFilter(filter)} />
        </AccordionDetails>
      </Accordion>
      <br />
      <Paper className={"grid paddings"}>
        <Map />
        <div>
          <SearchResult schools={schools} />
        </div>
      </Paper>
    </div>
  );
};

export default Home;
