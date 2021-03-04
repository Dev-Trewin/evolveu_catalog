import React, { useState, useEffect } from 'react';
import CatalogList from './CatalogList';
import CheckboxSection from './CheckboxSection'
import PulldownFilters from './PulldownFilters'
import '../../tailwind.output.css';
import { Link } from 'react-router-dom';


const Home = () => {
   const [projectDetails, setprojectDetails] = useState([]);
   const [desiredProjectNumOrder, setDesiredProjectNumOrder] = useState([]);
   const [languages, setLanguages] = useState([]);
   const [frontend, setFrontend] = useState([]);
   const [backend, setBackend] = useState([]);
   const [cohortList, setCohortList] = useState([]);
   const [studentList, setStudentList] = useState([]);
   const [clearUpOptions, setClearUpOptions] = useState(false)
   const [listOfOptions, setListOfOptions] = useState({
      cohort: "",
      project: "",
      student: ""
   })

   useEffect(() => {
      console.log("languages: ", languages);
      console.log("frontend: ", frontend);
      console.log("backend: ", backend);
      console.log('listOfOptions, ', listOfOptions)
   }, [languages, frontend, backend, listOfOptions])     // so run this whenever languages, frontend or backend states change?


   useEffect(() => {
      fetch(`http://localhost:3001/api/project`)
         .then((res) => res.json())
         .then((data) => setprojectDetails(data))
         .catch((err) => console.log("Cannot reach the server", err));
   }, []);

   useEffect(() => {
      fetch(`http://localhost:3001/api/init/projects`)
         .then((res) => res.json())
         .then((data) => {
            buildDesiredProjectNumOrder(data);
            // console.log("Home.js: Init projects data =", data);
         })
         .catch((err) => console.log("Cannot reach the server", err));
   }, []);

   useEffect(() => {
      fetch(`http://localhost:3001/api/init/cohorts`)
         .then((res) => res.json())
         .then((data) => {
            buildCohortList(data);
            // console.log("Home.js: Init cohorts data =", data);
         })
         .catch((err) => console.log("Cannot reach the server", err));
   }, []);

   useEffect(() => {
      fetch(`http://localhost:3001/api/init/students`)
         .then((res) => res.json())
         .then((data) => {
            buildStudentList(data);
            // console.log("Home.js: Init students data =", data);
         })
         .catch((err) => console.log("Cannot reach the server", err));
   }, []);


   const buildDesiredProjectNumOrder = (dataFromServer) => {
      let arrayOfProjectNum = [];
      dataFromServer.map((obj) => {             // Should this be .forEach instead of .map?
         arrayOfProjectNum.push(obj.name);      // .map expects a return value from this function
      });
      // console.log("projects obj from server", arrayOfProjectNum);
      setDesiredProjectNumOrder(arrayOfProjectNum);
   };

   const buildCohortList = (dataFromServer) => {
      let arrayOfCohortNum = [];
      dataFromServer.map((obj) => {
         arrayOfCohortNum.push(obj.name);
      });
      // console.log("Cohorts obj from server:", arrayOfCohortNum);
      setCohortList(arrayOfCohortNum);
   };

   const buildStudentList = (dataFromServer) => {
      let arrayOfStudentNames = [];
      dataFromServer.map((obj) => {
         arrayOfStudentNames.push(obj.name);
      });
      // console.log("Cohorts obj from server:", arrayOfStudentNames);
      setStudentList(arrayOfStudentNames);
   };


   const onChangeCheckbox = (event) => {
      let array = [];
      console.log("event.target.value=", event.target.value);
      const value = event.target.value

      const parentId = document.querySelector("#" + event.target.id).parentNode.id;
      // console.log("parentId=", parentId);
      const key = parentId.slice(8); // removes "section-" from event object's parent object's id

      let index = -1;

      switch (key) {
         case "languages":
            array = [...languages]; // makes a copy of the languages array
            index = array.indexOf(value);

            if (index === -1) {
               array.push(value); // When box is checked, adds this languages to the array
               setLanguages(array);
            } else {
               array.splice(index, 1); // for uncheck, removes this language from the array
               setLanguages(array);
            }
            break;
         case "framework":
            array = [...frontend];
            index = array.indexOf(value);
            if (index === -1) {
               array.push(value);
               setFrontend(array);
            } else {
               array.splice(index, 1);
               setFrontend(array);
            }
            break;
         case "backend":
            array = [...backend];
            index = array.indexOf(value);
            if (index === -1) {
               array.push(value);
               setBackend(array);
            } else {
               array.splice(index, 1);
               setBackend(array);
            }
            break;
         default:
            break;
      }
      // console.log("Amended array is:", array);
      // console.log("");
   };

   useEffect(() => {
      const cohortURL = `cohort=${listOfOptions.cohort}`
      const projectURL = `projectnum=${listOfOptions.project}`
      const nameURL = `name=${listOfOptions.student}`
      let languagesURL = ''
      languages.map(language => languagesURL = languagesURL + 'languages=' + language + '&')
      let frontendUrl = ''
      frontend.map(tool => frontendUrl = frontendUrl + 'frontend=' + tool + '&')
      let backendURL = ''
      backend.map(tool => backendURL = backendURL + 'backend=' + tool + '&')

      fetch(`http://localhost:3001/api/project?${cohortURL}&${projectURL}&${nameURL}&${languagesURL}${frontendUrl}${backendURL}`)
         .then((res) => res.json())
         .then((data) => setprojectDetails(data))
         .catch((err) => console.log("Cannot reach the server", err))

   }, [listOfOptions, languages, frontend, backend])

   const handleClearOptions = () => {
      setClearUpOptions(!clearUpOptions)
      setFrontend([])
      setBackend([])
      setLanguages([])
   }
   return (
      <div>

         <div className="bold text-evu-lt-blue  text-4xl md:text-5xl  mt-12 text-center">
            <Link to="/">Catalog of Student Projects </Link></div>
         <br />
         <PulldownFilters
            desiredProjectNumOrder={desiredProjectNumOrder}
            cohortList={cohortList}
            studentList={studentList}
            listOfOptions={data => setListOfOptions(data)}
            clearOptions={clearUpOptions}
         />

         <hr className="h-1 border-gray-400" />

         <CheckboxSection handleChangeCheckbox={onChangeCheckbox} clearOptions={clearUpOptions} />
         <hr className="h-1 border-gray-400" />
         <div className="grid" >
            <button className="px-3 pt-0.5  text-xs md:text-xs lg:text-sm  rounded shadow-sm  border border-gray-600c 
            place-self-center  bg-gray-200 hover:bg-white transition duration-300"  onClick={handleClearOptions} >
               Clear Options
            </button>
         </div>

         <hr className="h-1 border-gray-400" />

         <CatalogList projectData={projectDetails} desiredProjectNumberOrder={desiredProjectNumOrder} />

         {/* {console.log("Home.js: projectData = ", projectDetails)} */}
         {/* {console.log("Home.js: desiredProjectNumOrder = ",desiredProjectNumOrder)} */}
      </div >
   );

};

export default Home;