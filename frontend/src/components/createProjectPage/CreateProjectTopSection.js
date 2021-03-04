import React, { useState, useEffect } from 'react';
import DropdownList from './DropdownList';
import StyledForm from './StyledForm';


const CreateProjectTopSection = (props) => {
    const tempProject = ['Project 1: Resume', 'Project 2']
    const tempCohort = ['Cohort 1', 'Cohort 2', 'Cohort 3', 'Cohort 4']
    const [listOfCohorts, setListOfCohorts] = useState(tempCohort);
    const [listOfProjectsNumber, setListOfProjectsNumber] = useState(tempProject);
    // const [serverFailed, setServerFailed] = useState(false);

    useEffect(() => {
        validateTitle()

    }, [])

    useEffect(() => {
        fetch('http://localhost:3001/api/init/cohorts')
            .then(res => res.json())
            .then(data => handleListOfThingsFromServer(data, 'cohorts'))
            .catch(err => {
                // setServerFailed(true)
                console.log('The server could not be reach: ', err)
            })
    }, [])
    useEffect(() => {
        fetch('http://localhost:3000/api/init/projects')
            .then(res => res.json())
            .then(data => handleListOfThingsFromServer(data, 'projects'))
            .catch(err => {
                // setServerFailed(true)
                console.log('The server could not be reach: ', err)
            })

    }, [])
    const handleListOfThingsFromServer = (dataFromServer, key) => {
        // console.log('in handle server', dataFromServer)
        let arrayForSetting = []
        dataFromServer.map(obj => arrayForSetting.push(obj.name))
        if (key === 'projects') setListOfProjectsNumber(arrayForSetting)
        if (key === 'cohorts') setListOfCohorts(arrayForSetting)
    }
    const validateTitle = () => {
        const title = document.querySelector('#title')
        if (title && title.value.length > 5) return true;
        return false;
    }



    return (
        <div>
            <StyledForm>
                <form>
                    <div className="flex-wrap  mb-6" >
                        <div className="">
                            <label
                                htmlFor="title"
                            >
                                Project Title:</label>
                        </div>
                        <div className="">
                            {validateTitle() ? "" : <span className="text-red-400">required *</span>}
                        </div>
                        <div className="w-full">
                            <input
                                id='title'
                                type='text'
                                autoComplete="off"
                                onChange={props.handleChangeTitle}
                                value={props.title}
                            />

                        </div>
                    </div >
                    <div className="flex-wrap mb-6" >
                        <div className="">
                            <label
                                htmlFor="team-name"
                            >
                                Team Name:</label>
                        </div>
                        <div className="w-full">
                            <input
                                id='team-name'
                                type='text'
                                autoComplete="off"
                                onChange={props.handleChangeTeamName}
                                value={props.teamName}
                            />
                        </div>
                    </div >
                    <div className="flex space-x-20">
                        <DropdownList
                            id={props.id1}
                            list={listOfCohorts}
                            label={props.labelDropdown1}
                            handleSelectedItem={props.handleSelectedCohort}
                        />
                        <DropdownList
                            id={props.id2}
                            list={listOfProjectsNumber}
                            label={props.labelDropdown2}
                            handleSelectedItem={props.handleSelectedProjectNumber}
                        />
                    </div>



                </form>
            </StyledForm>


        </div>
    )

};

export default CreateProjectTopSection;