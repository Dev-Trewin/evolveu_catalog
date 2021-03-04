import React, { useEffect } from 'react';

const CheckboxSection = (props) => {


   useEffect(() => {
      // console.log('clear options: ')
      const elements = document.querySelectorAll('input')
      for (let i = 0; i < elements.length; i++) {
         console.log(elements[i].checked)
         elements[i].checked = false
      }

   }, [props.clearOptions])
   return (

      // Container for Checkbox controls
      <div className="flex flex-row flex-wrap justify-around align-center">

         {/* Languages */}
         <form id="section-checkbox" className="md:w-64 lg:w-72 px-3 pb-4">
            <div className="flex flex-col md:flex-row flex-wrap">

               <div id="section-languages" className="md:w-64 lg:w-72 px-3 pb-4" >

                  <label className="pl-6 pb-2">Languages</label><br />
                  <input
                     id="checkbox-html"
                     type="checkbox"
                     value="HTML/CSS"
                     className="mx-2"
                     onChange={props.handleChangeCheckbox}
                  />
                  <label htmlFor="checkbox-html" className="text-gray-700">HTML/CSS</label>
                  <br />

                  <input
                     id="checkbox-js"
                     type="checkbox"
                     value="Javascript"
                     className="mx-2"
                     onChange={props.handleChangeCheckbox}
                  />
                  <label htmlFor="checkbox-js" className="text-gray-700">Javascript</label>
                  <br />

                  <input
                     id="checkbox-python"
                     type="checkbox"
                     value="Python"
                     className="mx-2"
                     onChange={props.handleChangeCheckbox}
                  />
                  <label htmlFor="checkbox-python" className="text-gray-700">Python</label>

               </div>
            </div>
         </form>


         {/* Frontend */}
         <form id="section-checkbox" className="md:w-64 lg:w-72 px-3 pb-4">
            <div className="flex flex-col md:flex-row flex-wrap">

               <div id="section-framework" className="md:w-64 lg:w-72 px-3 pb-4" >

                  <label className="text-gray-700">Front-End</label>
                  <br />

                  <input
                     id="checkbox-vuejs"
                     type="checkbox"
                     value="Vue.js"
                     className="mx-2"
                     onChange={props.handleChangeCheckbox}
                  />
                  <label htmlFor="checkbox-vuejs" className="text-gray-700">Vue.js</label>
                  <br />

                  <input
                     id="checkbox-react"
                     type="checkbox"
                     value="React.js"
                     className="mx-2"
                     onChange={props.handleChangeCheckbox}
                  />
                  <label className="text-gray-700">React.js</label>
                  <br />

                  <input
                     id="checkbox-bootstrap"
                     type="checkbox"
                     value="Bootstrap"
                     className="mx-2"
                     onChange={props.handleChangeCheckbox}
                  />
                  <label htmlFor="checkbox-bootstrap" className="text-gray-700">Bootstrap</label>
                  <br />

                  <input
                     id="checkbox-redux"
                     type="checkbox"
                     value="Redux"
                     className="mx-2"
                     onChange={props.handleChangeCheckbox}
                  />
                  <label htmlFor="checkbox-redux" className="text-gray-700">Redux</label>
               </div>
            </div>
         </form>


         <form id="section-checkbox" className="md:w-64 lg:w-72 px-3 pb-4">
            <div id="section-backend" className="flex-auto">
               <label className="text-gray-700">Back-End</label>
               <br />
               <input
                  id="checkbox-nodejs"
                  type="checkbox"
                  value="Node.js"
                  className="mx-2"
                  onChange={props.handleChangeCheckbox}
               />
               <label htmlFor="checkbox-nodejs" className="text-gray-700">Node.js</label>
               <br />

               <input
                  id="checkbox-sql"
                  type="checkbox"
                  value="SQL"
                  className="mx-2"
                  onChange={props.handleChangeCheckbox}
               />
               <label htmlFor="checkbox-sql" className="text-gray-700">SQL</label>
               <br />

               <input
                  id="checkbox-nosql"
                  type="checkbox"
                  value="NoSQL"
                  className="mx-2"
                  onChange={props.handleChangeCheckbox}
               />
               <label htmlFor="checkbox-nosql" className="text-gray-700">NoSQL</label>
               <br />

               <input
                  id="checkbox-express"
                  type="checkbox"
                  value="Express"
                  className="mx-2"
                  onChange={props.handleChangeCheckbox}
               />
               <label htmlFor="checkbox-express" className="text-gray-700">Express</label>

               <br />
               <input
                  id="checkbox-flask"
                  type="checkbox"
                  value="Flask"
                  className="mx-2"
                  onChange={props.handleChangeCheckbox}
               />

               <label htmlFor="checkbox-flask" className="text-gray-700">Flask</label>
            </div>

         </form>
      </div>
   )

};

export default CheckboxSection;