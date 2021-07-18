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
import { usePageDescriptor } from "../hook/usePageDescriptor";
import { useDeviceType } from "../hook/useDeviceSize";
import { usePrevState } from "../hook/usePrevState";
import Loading from "../components/Loading/Loading";

const Home = () => {
  const [originSchools, setOriginSchools] = useState();
  const [schools, setSchools] = useState([]);
  const [filter, setFilter] = useState({});
  const prevFilter = usePrevState(filter);
  const [expanded, setExpanded] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState();
  const [deviceType] = useDeviceType();
  usePageDescriptor({
    title: "키즈스쿨:: 유치원 찾기",
    description: "원하는 조건의 유치원을 손쉽게 찾고 비교할 수 있습니다"
  });
  const applyFilter = schools => {
    const getOnlyTime = time => {
      return parseInt(time.replace(/[^0-9]/gi, "").substring(0, 2));
    };
    let results = schools;
    if (filter.kinderName) {
      results = results.filter(school =>
        school.kinderName.includes(filter.kinderName)
      );
    }
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
    console.log("filter updated", prevFilter, filter);
    if (prevFilter?.sidoName !== sidoName || prevFilter?.sggName !== sggName) {
      setSchools(null);
      if (sidoName && sggName) {
        getSchoolsByAddress(sidoName, sggName, filter)
          .then(res => {
            setOriginSchools(res.data.schools);
          })
          .catch(console.error);
      } else if (filter.kinderName?.length >= 3) {
        getSchoolsByName(filter.kinderName)
          .then(res => {
            setOriginSchools(res.data.schools);
          })
          .catch(console.error);
      }
    }
  }, [filter]);
  useEffect(() => {
    if (originSchools) {
      setSchools(applyFilter(originSchools));
      if (originSchools.length === 1) setSelectedSchool(originSchools[0]);
    } else setSchools(null);
  }, [originSchools, filter]);
  useEffect(() => {
    console.log("schools", schools);
    setSelectedSchool(null);
  }, [schools]);
  return (
    <div className={"content"}>
      {deviceType !== "phone" && <h1>유치원 찾기</h1>}
      <Accordion
        expanded={expanded}
        onChange={(_, expanded) => {
          console.log("expanded", expanded);
          setExpanded(expanded);
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>
            <h3>검색 옵션 설정</h3>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SearchFilter onUpdate={filter => setFilter(filter)} />
        </AccordionDetails>
      </Accordion>
      <br />
      {(filter.kinderName?.length >= 3 ||
        (filter.sidoName && filter.sggName)) && (
        <Paper className={"grid paddings"}>
          <div>
            <Map markers={schools} highlight={selectedSchool} />
          </div>
          <div>
            <SearchResult schools={schools} handleSelect={setSelectedSchool} />
          </div>
        </Paper>
      )}
    </div>
  );
};

export default Home;
