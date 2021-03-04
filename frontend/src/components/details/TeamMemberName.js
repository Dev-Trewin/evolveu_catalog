import React, { useEffect } from 'react'
import './details.css'

const TeamMemberName = ({ id, names }) => {
    let renderedList = []
    console.log('names: ', names)
    if (names) {
        renderedList = names.map((name, index) => {
            return (
                <div className="item"
                    key={name.concat(index)}
                >
                    <i className="large github middle aligned icon"></i>
                    <div className="content">
                        <p className="header">{name} / Frontend developer</p>
                    </div>
                </div>

            )
        })
    }


    if (renderedList.length) {

        return (
            <div className="ui container relaxed divided list margin-added" >
                <h3>Team members name</h3>
                { renderedList}
            </div>
        )
    } else {
        return <div>Not working</div>
    }

}

export default TeamMemberName;
