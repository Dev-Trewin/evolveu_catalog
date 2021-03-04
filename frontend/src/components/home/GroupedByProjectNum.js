import React from 'react'
import ProjectListing from './ProjectListing'


const GroupedByProjectNum = (props) => {

  const renderedList = props.projectData.map(item => {
    return <ProjectListing projectData={item} key={'projectlisting' + item._id} />
  })


  return (
    <>
      {/* <!-- Container for List section  --> */}
      <div className="mt-8 px-3">
        <div className="h2  text-md md:text-md lg:text-lg  text-evu-blue  mt-10 mb-2 md:mb-3">
          {/* //Show the project number for the section coming */}
          {props.projectData[0].project_num}
        </div>

        <div className="h2 flex flex-row justify-left items-baseline  mb-3 md:mb-4">
          <div className="w-2/12 md:w-1/12">Cohort#</div>
          <div className="w-5/12 md:w-4/12">Project Title</div>
          <div className="w-5/12 pl-2">Team Members</div>
        </div>

        {renderedList}

      </div>
    </>
  );
}

export default GroupedByProjectNum

