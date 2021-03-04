import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import CatalogList from '../home/CatalogList';
import { useHistory } from 'react-router-dom'
import Details from '../details/Details'
import { useSelector } from "react-redux";
// import '../home/index.css';

const Dashboard = () => {
    const [projectDetails, setprojectDetails] = useState([]);
    const [desiredProjectNumOrder, setDesiredProjectNumOrder] = useState([]);
    const location = useHistory();

    const currentUser = useSelector((redux) => redux.auth.user);    // only updates value of currentUser when redux.auth changes

    useEffect(() => {
        fetch(`http://localhost:3001/api/project/userId/${currentUser.id}`)
            .then(res => res.json())
            .then(data => {
                setprojectDetails(data);
                console.log("Home.js: Data straight from server =", data)
            })
            .catch(err => console.log('Cannot reach the server', err))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:3001/api/init/projects`)
            .then((res) => res.json())
            .then((data) => {
                handleDesiredProjectNumOrder(data);
                // console.log("Home.js: Init projects =", data);
            })
            .catch((err) => console.log("Cannot reach the server", err));
    }, [])

    const handleDesiredProjectNumOrder = (dataFromServer) => {
        let arrayOfProjectNum = []
        dataFromServer.map(obj => {

            arrayOfProjectNum.push(obj.name)
        })
        // console.log("projects obj from server", arrayOfProjectNum);
        setDesiredProjectNumOrder(arrayOfProjectNum)
    }
   

    const handleOnClickCreate = () => {
        location.push('/create-project')
    }
    const handleOnClickToDetails = (event) => {
        return <Details />;
    }

    // redirect
    return (
        <div className="xs:w-100 sm:w-140 md:w-200 lg:w-240 mx-auto  text-gray-900 bg-white   text-md md:text-md lg:text-lg">
            <div className="w-full mx-10 mt-6 px-6 py-8 " >
                <div id="section-title" className="text-gray-800 font-bold text-center text-xl mb-10">
                    <h1 className="font-medium">Welcome to your dashboard</h1>
                </div>


                <button
                    className="object-right  bg-white text-green-400 border-2 border-green-400 py-1 px-2 rounded-full hover:text-white hover:bg-green-400 focus:outline-none focus:shadow-outline"
                    onClick={handleOnClickCreate}
                >
                    New Project</button>
                <div>
                    <hr className="h-1 border-gray-400 mt-4" />
                    <CatalogList
                        projectData={projectDetails}
                        desiredProjectNumberOrder={desiredProjectNumOrder}
                    />

                </div>
            </div>

        </div>


    )
}

export default Dashboard;