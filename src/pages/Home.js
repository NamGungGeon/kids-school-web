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
  const [selectedSchool, setSelectedSchool] = useState();
  const applyFilter = schools => {
    const getOnlyTime = time => {
      return parseInt(time.replace(/[^0-9]/gi, "").substring(0, 2));
    };
    let results = schools;
    if (filter.openTime) {
      results = results.filter(
        school =>
          school.openTime && filter.openTime >= getOnlyTime(school.openTime)
      );
    }
    if (filter.closeTime) {
      results = results.filter(
        school =>
          school.closeTime && filter.closeTime <= getOnlyTime(school.closeTime)
      );
    }
    if (filter.kinderType) {
      results = results.filter(school =>
        school.kinderType?.includes(filter.kinderType)
      );
    }
    if (filter.requireHandicap) {
      results = results.filter(school => school.classCountHandicap);
    }
    if (filter.requireBus) {
      results = results.filter(school => school.busCount);
    }
    if (filter.requireCCTV) {
      results = results.filter(school => school.cctvCount);
    }
    return results;
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const { sidoName, sggName } = filter;
    setSchools(null);
    console.log("filter updated", filter);
    if (sidoName && sggName) {
      getSchoolsByAddress(sidoName, sggName, filter)
        .then(res => {
          setSchools(applyFilter(res.data.schools));
        })
        .catch(console.error);
    } else if (filter.kinderName?.length >= 3) {
      getSchoolsByName(filter.kinderName)
        .then(res => {
          setSchools(applyFilter(res.data.schools));
        })
        .catch(console.error);
    }
  }, [filter]);
  useEffect(() => {
    console.log("schools", schools);
    setSelectedSchool(null);
  }, [schools]);
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
          <Typography>
            <b>검색 옵션 설정</b>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SearchFilter onUpdate={filter => setFilter(filter)} />
        </AccordionDetails>
      </Accordion>
      <br />
      {filter.kinderName?.length >= 3 ||
        (filter.sidoName && filter.sggName && (
          <Paper className={"grid paddings"}>
            <div>
              <Map markers={schools} highlight={selectedSchool} />
            </div>
            <div>
              <SearchResult
                schools={schools}
                handleSelect={setSelectedSchool}
              />
            </div>
          </Paper>
        ))}
    </div>
  );
};

export default Home;
