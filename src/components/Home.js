import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { api } from '../api';
import { useServerData } from '../state/serverDataContext';

const Home = () => {
  const serverData = useServerData(data => {
    let years = [];
    // console.log(data)
    if(data.missionData){data.missionData.forEach(mission => {
      if (years.indexOf(mission.launch_year) === -1) {
        years.push(mission.launch_year)
      }
    });
  }
    return { missionData: data.missionData || [], years: years };
  });
  const [missionData, setMissionData] = useState(serverData.missionData);
  const [years] = useState(serverData.years);
  const [selectedYear, setSelectedyear] = useState("");
  const [launchStatus, setLaunchStatus] = useState("");
  const [landStatus,setLandStatus] = useState("")

  let getFilteredData = (launchStatus,landStatus,selectedYear)=>{
    setSelectedyear(selectedYear);
    setLandStatus(landStatus)
    setLaunchStatus(launchStatus)
    api.getFilteredData(launchStatus,landStatus,selectedYear).then(data=>{
      setMissionData(data)
    })
  }

  return (
    <div>
      <h3 className="heading">SpaceX Launch Programs</h3>
      <Container fluid>
        <Row>
          <Col lg={2} sm={4}>
            <div className="filterContainer">
              <h4 className="text-left">Filters</h4>
              <div className="filterType">
                <p>Launch Year</p>
                {years.map((year, i) => {
                  return <div className={`filter ${selectedYear === year?"active":""}`}  onClick={()=>getFilteredData(launchStatus,landStatus,year)} key={i}>{year}</div>
                })}

              </div>
              <div className="filterType">
                <p>Successful Launch</p>
                <div className={`filter ${launchStatus === "True"?"active":""}`} onClick={()=>getFilteredData("True",landStatus,selectedYear)}>True</div>
                <div className={`filter ${launchStatus === "False"?"active":""}`} onClick={()=>getFilteredData("False",landStatus,selectedYear)}>False</div>
              </div>
              <div className="filterType">
                <p>Successful Landing</p>
                <div className={`filter ${landStatus === "True"?"active":""}`} onClick={()=>getFilteredData(launchStatus,"True",selectedYear)}>True</div>
                <div className={`filter ${landStatus === "False"?"active":""}`} onClick={()=>getFilteredData(launchStatus,"False",selectedYear)}>False</div>
              </div>
            </div>
          </Col>
          <Col lg={10} sm={8} >
            <div className="resultContainer">
              <Row className="flexRow">
                {missionData.map((mission, i) => {
                  return <div className="resultItem">
                    <div>
                      <div className="imageBox"><img src={mission.links.mission_patch_small} /></div>
                      <div className="missionInfo">
                        <a href={mission.links.article_link}>{mission.mission_name}</a>
                        <p>Mission Ids: {!mission.mission_id.length && (<span>NA</span>)}</p>
                        {mission.mission_id.length > 0 && (<ul>
                          {mission.mission_id.map((ids, j) => {
                            return <li key={j}>{ids}</li>
                          })}
                        </ul>)}
                        <p>Launch year: <span>{mission.launch_year}</span></p>
                        <p>Successful Launch: <span>{mission.launch_success ? "True" : "False"}</span></p>
                        <p>Successful Landing: <span>{mission.launch_landing ? "True" : "False"}</span></p>
                      </div>
                    </div>
                  </div>
                })}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

Home.fetchData = () => {
  return api.all().then(missionData => {
    return {
      missionData
    };
  });
};

export default Home;
