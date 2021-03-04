import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import '../../styles/CreateProjectPage.css'
import CreateProjectTopSection from './CreateProjectTopSection';
import InsertLink from './InsertLink';
import CheckboxSection from './CheckboxSection';
import SearchAndAdd from './SearchAndAdd';
import UploadImage from './UploadImage';
import SubmitButtons from './SubmitButtons';
import FeatureList from './FeatureList';
import DescriptionSection from './DescriptionSection'
import InsertLinkForATeammate from './InsertLinkForATeammate';
import ListOfLinkAccount from './ListOfLinkAccount';
import { useSelector } from "react-redux";

const CreateProjectPage = () => {

    const [title, setTitle] = useState('');
    const [teamName, setTeamName] = useState('')
    const [description, setDescription] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [githubLinkIsValid, setGithubLinkIsValid] = useState(false);
    const [websiteLink, setWebsiteLink] = useState('');
    const [websiteLinkIsValid, setWebsiteLinkIsValid] = useState(false);
    const [isLinkRequired, setIsLinkRequired] = useState(true);
    const [image, setImage] = useState([]);
    const [feature, setFeature] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [framework, setFramework] = useState([]);
    const [backend, setBackend] = useState([]);
    const [selectedCohort, setSelectedCohort] = useState('Cohort 1');
    const [selectedProjectNumber, setSelectedProjectNumber] = useState('Project 1 (Online Resume)')
    const [tools, setTools] = useState([]);
    const [teammates, setTeammates] = useState([]);
    const [teamMemberAccounts, setTeamMemberAccounts] = useState([]);
    const [listOfAllStudents, setListOfAllStudents] = useState([]);
    const [listOfTools, setListOfTools] = useState([]);


    const [serverFailed, setServerFailed] = useState(false);
    const [projectId, setProjectId] = useState();
    const location = useHistory();
    const currentUser = useSelector((redux) => redux.auth.user);    // only updates value of currentUser when redux.auth changes
    const [currentStep, setCurrentStep] = useState(1)



    const onPublish = (event) => {

        // Calling this function saves the project details to the database
        // if (validate()) {
        //     if (image.length) {
        //         console.log('*********send image')
        //         postImageToServer()
        //     } else {
        //         postFormDataToServer("")
        //     }

        // }
        console.log('postImage tot server')
        let formData = new FormData()
        //********Image */
        formData.append('name', image.name);
        formData.append('image', image[0]);
        /*********Rest of the dataf************/
        formData.append('project_name', title);
        formData.append('description', description);
        formData.append('team_name', teamName);
        formData.append('key_feature', feature);
        formData.append('repository', githubLink);
        formData.append('website', websiteLink);

        formData.append('language', languages);
        formData.append('framework', framework);
        formData.append('database', backend);
        formData.append('cohort_num', selectedCohort);
        formData.append('project_num', selectedProjectNumber);
        formData.append('extra_tools', tools);
        formData.append('name_team_member', teammates);
        formData.append('team_member_accounts', teamMemberAccounts);
        formData.append('owner', currentUser.id);

        console.log(formData)
        fetch('http://localhost:3000/api/project', {
            method: 'POST',
            body: formData
        })
            .then(resp => resp.json())
            .then(body => {
                console.log('body', body)
                location.push({
                    pathname: '/details',
                    state: {
                        fromNotifications: body._id
                    }
                })
            })
            .catch(err => console.log('The server could not be reach: ', err))
    }

    useEffect(() => {
        fetch('http://localhost:3000/api/init/students')
            .then(res => res.json())
            .then(data => handleListOfThingsFromServer(data, 'students'))
            .catch(err => {
                setServerFailed(true)
                console.log('The server could not be reach: ', err)
            })
    }, [])
    useEffect(() => {
        fetch('http://localhost:3000/api/init/tools')
            .then(res => res.json())
            .then(data => handleListOfThingsFromServer(data, 'tools'))
            .catch(err => {
                setServerFailed(true)
                console.log('server fail tools')
                console.log('The server could not be reach: ', err)
            })

    }, [])
    const handleListOfThingsFromServer = (dataFromServer, key) => {
        // console.log('in handle server', dataFromServer)
        let arrayForSetting = []
        dataFromServer.map(obj => arrayForSetting.push(obj.name))
        if (key === 'students') setListOfAllStudents(arrayForSetting)
        if (key === 'tools') setListOfTools(arrayForSetting)
    }


    useEffect(() => {
        if (githubLinkIsValid || websiteLinkIsValid) {
            setIsLinkRequired(false)
        } else {
            setIsLinkRequired(true)
        }
    }, [githubLinkIsValid, websiteLinkIsValid])


    const goToLink = (event) => {
        const id = event.target.id;
        switch (id) {
            case 'github-link':
                window.open(githubLink, '_blank');
                break;
            case 'btn-github':
                window.open(githubLink, '_blank')
                break;

            case 'website-link':
                window.open(websiteLink, '_blank');
                break;
            case 'btn-website':
                window.open(websiteLink, '_blank');
                break;
            default:
                break;
        }

    }


    const keyUp = (event) => {
        const enterKey = 13;
        if (event.keyCode === enterKey) {
            goToLink(event)
        }

    }
    //this is it a cleaning function, unable to initialize state in child
    //array accounts gets back with null value in it
    //function is to remove them
    const handleMemberAccounts = (accounts) => {
        let cleanArray = []
        const oldArray = accounts;
        oldArray.map(item => {
            console.log(item)
            if (item && (item.github || item.linked)) cleanArray.push(item)
        })
        console.log(cleanArray)
        setTeamMemberAccounts(cleanArray)
    }
    const onChangeCheckbox = (event) => {
        let array = [];
        console.log("event.target.value=", event.target.value)
        const value = event.target.value;    //removes "checkbox-" from event object's id

        const parentId = document.querySelector('#' + event.target.id).parentNode.id;
        console.log("parentId=", parentId);
        const key = parentId.slice(8);          // removes "section-" from event object's parent object's id

        let index = -1;

        switch (key) {
            case 'languages':
                array = [...languages];      // makes a copy of the languages array
                index = array.indexOf(value);

                if (index === -1) {
                    array.push(value);       // When box is checked, adds this languages to the array
                    setLanguages(array);
                } else {
                    array.splice(index, 1);  // for uncheck, removes this language from the array
                    setLanguages(array);
                }
                break;

            case 'framework':
                array = [...framework];
                index = array.indexOf(value);
                if (index === -1) {
                    array.push(value);
                    setFramework(array);
                } else {
                    array.splice(index, 1);
                    setFramework(array);
                }
                break;

            case 'backend':
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
        console.log("Amended array is:", array)
        console.log("")
    }

    useEffect(() => {
        console.log('selectedCohort: ', selectedCohort)
        console.log('selectedProjectNumber', selectedProjectNumber)
    }, [selectedCohort, selectedProjectNumber])

    const validate = () => {
        return true;
        if (title.length < 5) return false
        if (description.length < 30) return false
        if (!githubLinkIsValid && !websiteLinkIsValid) return false
        return true;
    }

    useEffect(() => {
        console.log('currentStep: ', currentStep)
    }, [currentStep])
    const nextStep = () => {
        setCurrentStep(currentStep >= 6 ? 7 : currentStep + 1)
    }
    const prevStep = () => {
        setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1)
    }
    const previousButton = () => {
        if (currentStep !== 1) {
            return (
                <button
                    className="bg-white text-green-400 border-2 border-green-400 py-1 px-2 rounded-lg hover:text-white hover:bg-green-400 focus:outline-none focus:shadow-outline"
                    type='button' onClick={prevStep}>
                    Previous
                </button>
            )
        }
        return null
    }
    const nextButton = () => {
        if (currentStep < 7) {
            return (
                <button
                    className="bg-white text-green-400 border-2 border-green-400 py-1 px-6 rounded-lg hover:text-white hover:bg-green-400 focus:outline-none focus:shadow-outline"
                    type='button' onClick={nextStep}>
                    Next
                </button>
            )
        }
        return null
    }
    return (
        <div className="w-full flex justify-center ">
            <div className="mx-10 mt-6 px-12 py-8 " >

                <div id="section-title" className="text-gray-800 font-bold text-center text-xl mb-10">
                    {serverFailed ? <h2><span className="text-red-400">The server cannot be reach</span></h2> : <span></span>}
                    <h1>Create a new project!</h1>

                </div>
                {currentStep === 1 ? (


                    <div className="">

                        <h3 className="text-gray-700 font-bold text-center text-xl mb-10 ">Team Member(s)</h3>
                        <p className="text-gray-700 font-bold mb-2">Here you can search for you team member.</p>

                        <SearchAndAdd
                            label="Team Member"
                            listOfItems={listOfAllStudents}
                            handleChangeList={s => setTeammates(s)}
                        />

                    </div>
                ) : null}
                {currentStep === 2 ? (
                    <div className="">
                        <h3 className="text-gray-700 font-bold text-center text-xl mb-10">Title and Team Name</h3>

                        <CreateProjectTopSection
                            handleChangeTitle={event => setTitle(event.target.value)}

                            title={title}

                            handleChangeTeamName={event => setTeamName(event.target.value)}
                            teamName={teamName}

                            id1="cohorts-dropdown"
                            // cohorts={listOfCohorts}
                            labelDropdown1="Cohort Number:"
                            handleSelectedCohort={e => setSelectedCohort(e.target.value)}

                            id2="projectsnumber-dropdown"
                            // projectsNumber={listOfProjectsNumber}
                            labelDropdown2="Project Number:"
                            handleSelectedProjectNumber={e => setSelectedProjectNumber(e.target.value)}
                        />
                    </div>
                ) : null}
                {currentStep === 3 ? (
                    <div className="">
                        <h3 className="text-gray-700 font-bold text-center text-xl mb-10">Description</h3>

                        <DescriptionSection
                            handleChangeDescription={event => setDescription(event.target.value)}
                            description={description}
                        />


                    </div >
                ) : null}
                {currentStep === 4 ? (
                    <div className="">
                        <h3 className="text-gray-700 font-bold text-center text-xl mb-10">Key Feature and Screenshot</h3>
                        <p className="text-gray-700 font-bold mb-2">Please enter some feature you think people should know about.</p>

                        <FeatureList
                            id="key-feature"
                            label="Key Feature"
                            listOfFeature={list => setFeature(list)}
                        />
                        <UploadImage
                            imagePath={image.name}
                            handleChangeImage={event => setImage([event.target.files[0]])}
                        />
                    </div>

                ) : null}
                {currentStep === 5 ? (
                    <div className="">
                        <h3 className="text-gray-700 font-bold text-center text-xl mb-10">Repository and Website Address</h3>
                        <p className="text-gray-700 font-bold mb-2">At least one of these are required.</p>

                        <InsertLink
                            label="Project Repository Link"
                            inputId="github-link"
                            btnId="btn-github"
                            handleChangeInput={(event) => setGithubLink(event.target.value)}
                            handleKeyUp={keyUp}
                            handleClick={goToLink}
                            value={githubLink}
                            isValidate={resp => setGithubLinkIsValid(resp)}
                            isRequired={isLinkRequired}

                        />
                        <InsertLink
                            label="Project Website Link"
                            inputId="website-link"
                            btnId="btn-website"
                            handleChangeInput={event => setWebsiteLink(event.target.value)}
                            handleKeyUp={keyUp}
                            handleClick={goToLink}
                            value={websiteLink}
                            isValidate={resp => setWebsiteLinkIsValid(resp)}
                            isRequired={isLinkRequired}
                        />
                    </div>
                ) : null}
                {currentStep === 6 ? (
                    <div className="">
                        <h3 className="text-gray-700 font-bold text-center text-xl mb-10">Languages, Framework and Databases</h3>

                        <CheckboxSection
                            handleChangeCheckbox={onChangeCheckbox}
                        />
                        <SearchAndAdd
                            label="Languages/Tools"
                            listOfItems={listOfTools}
                            handleChangeList={t => setTools(t)}
                        />
                    </div>
                ) : null}
                {currentStep === 7 ? (
                    <div className="">
                        <h3 className="text-gray-700 font-bold text-center text-xl mb-10">Team Members Info</h3>

                        <ListOfLinkAccount
                            names={teammates}
                            getAccounts={accounts => handleMemberAccounts(accounts)}
                        />
                        <SubmitButtons
                            label="Publish"
                            handleClick={onPublish}
                        />
                    </div>

                ) : null}
                <div className='w-100 flex justify-around'>
                    {previousButton()}
                    {nextButton()}

                </div>

            </div >
        </div >
    )
}

export default CreateProjectPage;