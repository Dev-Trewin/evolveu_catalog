import React, { useState, useEffect } from "react";
import Description from "./Description";
import TeamMemberName from "./TeamMemberName";
import Screenshot from "./Screenshot";
import Link from "./Link";
import ListOfThings from "./ListOfThings";
import "./details.css";
import styled from 'styled-components';

// Compiled and minified CSS
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" />

function Details(props) {
  const [project, setProject] = useState({});
  const [screenshot, setScreenshot] = useState()

  // Pulls project data from the API endpoint for this project (I'm guessing)
  useEffect(() => {
    const { handle } = props.match.params                   // Braces {} are for array deconstruction
    const { fromNotifications } = props.location.state // These props come from Link on /src/home/ProjectListing.js 
    if (fromNotifications) {
      fetch("http://localhost:3001/api/project/" + fromNotifications)     // fromNotifications = ID of the project (used in URL)
        .then((res) => res.json())
        .then((data) => setProject(data))
        .catch(err => console.log('The server could not be reach: ', err))
    }
  }, []);


  useEffect(() => {
    if (project && project.screenshotId) {
      console.log('fetch projectid: ', project.screenshotId)
      fetch(`http://localhost:3001/api/image/` + project.screenshotId)
        .then((res) => res.json())
        .then((data) => {
          setScreenshot(data)
          // console.log(data.img.data.data)
        })
        .catch(err => console.log('The server could not be reach: ', err))
    }
  }, [project])

  // Every time the project changes (load or reload the page) it prints to the console log
  useEffect(() => {
    if (project) {
      console.log("project on loading page", project);
      console.log()
    }
  }, [project]);


  return (
    <ContainerProject className="ui container margin-added body">
      <div className="ui container head">
        <h2 className="ui center aligned icon header">
          <i className="circular users icon"></i>
          {project.project_name}
        </h2>
      </div>
      < div className="ui segment team">
        <h2 className="ui center aligned icon header">
          We are {project.team_name}!
        </h2>
      </div>
      <TeamMemberName names={project.name_team_member} id={project._id} />
      <Description
        description={project.description}
        projectNum={project.project_num}
        cohortNum={project.cohort_num}
      />

      {screenshot ? <Screenshot img={screenshot} /> : <div></div>}
      <ListOfThings list={project.language} label="Language" />
      <hr></hr>
      <ListOfThings list={project.framework} label="Front End" />
      <hr></hr>
      <ListOfThings list={project.database} label="Back End" />
      <Link accounts={project.team_member_accounts} />
    </ContainerProject>
  );
}

export default Details;

const ContainerProject = styled.div`
  text-align:center;
  margin: 15px;
  padding: 20px;
  height:100vh;
`

