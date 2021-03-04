import React, { useEffect } from 'react'

export default function Description(props) {

    return (
        <div className="ui segment">
            <div className="">
                <div className="ui two column  center aligned grid segment">
                    <div className="column">
                        <h3 className="ui header">{props.projectNum}</h3>
                    </div>
                    <div className="ui vertical divider"></div>
                    <div className="column">
                        <h3 className="ui header  ">{props.cohortNum}</h3>

                    </div>
                </div>
            </div>

            <hr></hr>
            <div className="ui segment">
                <h3 className="ui header centered">Project Description</h3>
                <p className="ui text container ">{props.description}</p>
            </div>


        </div>
    )
}
