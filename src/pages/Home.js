import React, { createRef, useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import SearchFilter from "../containers/SearchFilter/SearchFilter";
import SearchResult from "../containers/SearchResult/SearchResult";

const Home = () => {
  const [map, setMap] = useState();
  const [expanded, setExpanded] = useState(true);
  useEffect(() => {
    if (map) {
      var markerPosition = new window.kakao.maps.LatLng(37.506502, 127.053617);
      var marker = new window.kakao.maps.Marker({
        position: markerPosition
      });
      marker.setMap(map);
    }
  }, [map]);

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
          <Typography>상세설정</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SearchFilter />
        </AccordionDetails>
      </Accordion>
      <br />
      <Paper className={"grid paddings"}>
        <div
          id="map"
          style={{
            width: "100%",
            height: "500px"
          }}
          ref={ref => {
            if (!map) {
              const script = document.createElement("script");
              script.async = true;
              script.src =
                "https://dapi.kakao.com/v2/maps/sdk.js?appkey=062e58036018572a63b7d71f1405145a&autoload=false";
              document.head.appendChild(script);

              script.onload = () => {
                window.kakao.maps.load(() => {
                  let options = {
                    center: new window.kakao.maps.LatLng(37.506502, 127.053617),
                    level: 7
                  };

                  const map = new window.kakao.maps.Map(ref, options);
                  setMap(map);
                });
              };
            }
          }}
        />
        <div>
          <SearchResult />
        </div>
      </Paper>
    </div>
  );
};

export default Home;
