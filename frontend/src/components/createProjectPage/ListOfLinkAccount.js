import React, { useState, useEffect } from 'react'
import InsertLinkForATeammate from './InsertLinkForATeammate';

const ListOfLinkAccount = (props) => {

    const [teamMemberAccounts, setTeamMemberAccounts] = useState([])


    const handleData = (account, index) => {

        let newArr = [...teamMemberAccounts]; // copying the old datas array
        newArr[index] = account; // replace e.target.value with whatever you want to change it to
        setTeamMemberAccounts(newArr); // 
    }



    useEffect(() => {
        console.log('teamMemberAccounts ', teamMemberAccounts)
        props.getAccounts(teamMemberAccounts)
    }, [teamMemberAccounts])


    const renderedList = props.names.map((name, i) => {

        return (<div key={name + i}>

            <InsertLinkForATeammate
                key={name + i}
                index={i}
                name={name}
                teamMemberAccount={handleData}
            />
        </div >)
    })

    if (renderedList.length) {
        return (<div>{renderedList}</div>)
    } else {
        return (<div></div>)
    }
}

export default ListOfLinkAccount;