import React, { useState, useEffect } from 'react'



const PulldownFilters = (props) => {
    const [listOfOptions, setListOfOptions] = useState({
        cohort: "",
        project: "",
        student: ""
    })

    let renderedCohortList = []
    if (props.cohortList) {
        renderedCohortList = props.cohortList.map((item, index) => {
            return (
                <option
                    value={item}
                    key={item + index}

                >
                    {item}</option>
            )
        })
    }
    let renderedStudentList = []
    if (props.studentList) {
        renderedStudentList = props.studentList.map((item, index) => {
            return (
                <option
                    value={item}
                    key={item + index}

                >
                    {item}</option>
            )
        })
    }
    let renderedProjectNumberList = []
    if (props.desiredProjectNumOrder) {
        renderedProjectNumberList = props.desiredProjectNumOrder.map((item, index) => {
            return (
                <option
                    value={item}
                    key={item + index}

                >
                    {item}</option>
            )
        })
    }
    useEffect(() => {
        console.log('listOfOptions: ', listOfOptions)
        props.listOfOptions(listOfOptions)

    }, [listOfOptions])
    useEffect(() => {
        setListOfOptions({
            cohort: "",
            project: "",
            student: ""
        })
    }, [props.clearOptions])


    return (
        <>
            {/* <!-- Container for Upper filter controls --> */}
            < div className="flex flex-row flex-wrap justify-around align-baseline  mb-5  bg-cover" >

                {/* <!-- Need to pass a default value if nothing is selected. Nice to format the option text but Optgroup didn't work.  --> */}
                < span className="mr-6 pl-1 py-1 h-7" >
                    <select
                        id="cohort"
                        name="cohort"
                        value={listOfOptions.cohort}
                        onChange={e => setListOfOptions({ ...listOfOptions, cohort: (e.target.value !== 'None') ? e.target.value : '' })}
                    >
                        <option value="None">Cohort Number</option>
                        {renderedCohortList}
                    </select>
                </span >

                {/*<!-- Need to pass a default value if nothing is selected. Nice to format the option text but Optgroup didn't work  --> */}
                < select id="project_num" name="project_num" className="mr-6 pl-1 pr-2 py-1 w-40 h-7"
                    onChange={e => setListOfOptions({ ...listOfOptions, project: (e.target.value !== 'None') ? e.target.value : '' })}
                    value={listOfOptions.project}
                >

                    <option
                        value="None"
                    >Project Number</option>
                    {renderedProjectNumberList}
                </select >
                {/* <!-- Need to pass a default value if nothing is selected. Nice to format the option text but Optgroup didn't work  --> */}
                < select id="name" name="name" className="mr-6 pl-1 pr-2 py-1 h-7 w-40"
                    onChange={e => setListOfOptions({ ...listOfOptions, student: (e.target.value !== 'None') ? e.target.value : '' })}
                    value={listOfOptions.student}
                >
                    <option value="None">Student Name</option>
                    {renderedStudentList}
                </select >

                {/* <!-- How to add a collective Submit button?  --> */}
                < div className="pl-2 py-1" >
                    {/* <!-- action="/action_page.php" --> */}
                    < div className="flex flex-row flex-no-wrap" >
                        <label htmlFor="keyword" className="pr-2">Keyword: </label>
                        <input type="text" id="keyword" name="keyword" className="bg-gray-200 rounded px-2 w-32" />
                    </div >

                </div >
            </div>
        </>

    )

}


export default PulldownFilters;



