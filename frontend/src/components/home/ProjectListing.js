
import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function ProjectListing(props) {
  let currentUser = useSelector((redux) => redux.auth.user);
  console.log('currentUser:', currentUser)
  const location = useLocation()
  const history = useHistory();

  const onDeleteProject = () => {
    fetch(`http://localhost:3001/api/project/${props.projectData._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(body => history.go(0))//reload page after delete of the project
      .catch(err => console.log('Cannot write on the server', err))
  }

  const separateNamesByComma = props.projectData.name_team_member.map((name, index) => {
    if (index >= props.projectData.name_team_member.length - 1) {
      return name
    }
    else {
      return name.concat(", ")
    }
  })


  const buttonDelete = () => {
    return (
      <div>
        <a className=" md:block  w-1/12">
          <button className="px-3 pt-0.5  text-xs md:text-xs lg:text-sm  rounded shadow-sm  border border-gray-600
                     bg-gray-200 hover:bg-white transition duration-300"  onClick={onDeleteProject} >
            Delete
          </button>
        </a>
      </div>
    )
  }

  return (
    <>
      <div>
        <div className="md:tracking-wide">
          <div className="flex flex-row items-baseline  mb-2 md:mb-3">
            <div className="w-2/12 md:w-1/12  pl-5">
              {props.projectData.cohort_num[7]}
            </div>

            <div className="w-5/12 md:w-4/12">
              <a className="border-b border-dotted border-gray-600" href="/#">
                {props.projectData.project_name}
              </a>
            </div>

            <div className="w-5/12 md:w-6/12  pl-2">
              {separateNamesByComma}
            </div>

            <div>
              <Link to={{
                pathname: '/details',
                state: {
                  fromNotifications: props.projectData._id
                }
              }}
                className="px-3 pt-0.5  text-xs md:text-xs lg:text-sm  rounded shadow-sm  border border-gray-600
                     bg-gray-200 hover:bg-white transition duration-300"> Details </Link>

              {location.pathname === '/dashboard' && currentUser?.roles?.includes("ROLE_ADMIN") ? buttonDelete() : ''}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectListing;