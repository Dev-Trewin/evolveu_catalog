import React, { useState } from 'react';
import StyledForm from './StyledForm';


const InsertLink = (props) => {

    const [isValidate, setIsValidate] = useState(false);



    const validate = (e) => {

        const regExpHttp = /^http/;
        console.log()
        if (props.value.match(regExpHttp)) {
            setIsValidate(true)
            props.isValidate(true)
            return props.handleClick(e)

        }
        setIsValidate(false)
    }
    return (
        <StyledForm>
            <div className="flex-wrap inline-flex mb-6 " >
                <div className="">
                    <label
                        htmlFor={props.inputId}
                        className="block"

                    >{props.label}:</label>
                </div>
                <div>
                    {props.isRequired ? <span className="text-red-400">required *</span> : ""}
                    {isValidate ? "" : <span className=""> Format: http://</span>}
                </div>

                <div className="w-full">
                    <div className="">
                        <input
                            id={props.inputId}
                            type='text'
                            onChange={props.handleChangeInput}
                            onKeyUp={props.handleKeyUp}
                            value={props.value}
                        />
                    </div>
                    <div className="flex items-center justify-between w-full mb-5 mt-1">
                        <button
                            id={props.btnId}
                            onClick={validate}
                        >Verify Link</button>
                    </div>
                </div>
            </div>

        </StyledForm>
    );

};

export default InsertLink;