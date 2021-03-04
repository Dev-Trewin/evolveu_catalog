import React, { useState, useEffect, useLayoutEffect } from 'react';
import StyledForm from './StyledForm';

const InsertLinkForATeammate = (props) => {
    const [inputGithub, setInputGithub] = useState('');
    const [inputLinked, setInputLinked] = useState('');
    const [account, setAccount] = useState({
        name: props.name,
        github: "",
        linked: ""
    });

    useEffect(() => {
        setAccount({
            ...account,
            github: inputGithub,
            linked: inputLinked
        })
    }, [inputGithub, inputLinked])

    useEffect(() => {
        props.teamMemberAccount(account, props.index)

    }, [account, props.name, props.index])
    useLayoutEffect(() => {
        props.teamMemberAccount(account, props.index)

    }, [props.name])


    return (
        <StyledForm>
            <div className=" mb-6 w-full inline-block" >
                <div className="float-left w-1/3">
                    <label
                        htmlFor="title"
                    >{account.name}</label>
                </div>
                <div className="float-right w-2/3">
                    <div>
                        <div className="">
                            <label
                                htmlFor="github-account"
                            >Github Account:</label>
                        </div>
                        <div className="w-full mb-4">
                            <div className="">
                                <div className="">
                                    <input
                                        id={props.id}
                                        type='text'
                                        onChange={event => setInputGithub(event.target.value)}
                                        value={inputGithub}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <label
                            htmlFor="linked-account"
                        >Linked Account:</label>
                    </div>
                    <div className="w-full mb-4">
                        <div className="">
                            <div className="">
                                <input
                                    id={props.id}
                                    type='text'
                                    onChange={event => setInputLinked(event.target.value)}
                                    value={inputLinked}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </StyledForm >
    )
}

export default InsertLinkForATeammate;

