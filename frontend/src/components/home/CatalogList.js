import React from 'react'
import GroupedByProjectNum from './GroupedByProjectNum'


const CatalogList = (props) => {

   var desiredProjectNumberOrder = props.desiredProjectNumberOrder

   // Output the project data, grouped by project number (in the sequence defined by desiredProjectNumberOrder)
   const groupedProjectsArray = desiredProjectNumberOrder.map(item => {
      let newArray = []

      props.projectData.map((object) => {
         if (object.project_num === item) {
            newArray.push(object);
         }
      });

      if (newArray.length) {
         return <GroupedByProjectNum projectData={newArray} key={item.project_num} id={item._id} />
      }

   })

   if (groupedProjectsArray.length) {
      return <>{groupedProjectsArray}</>;
   } else {
      return <div></div>
   }
}

export default CatalogList