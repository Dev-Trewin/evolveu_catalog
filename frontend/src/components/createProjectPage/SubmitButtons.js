import React from 'react';
import StyledForm from './StyledForm';

const SubmitButtons = (props) => {


    return (
        <StyledForm>
            <div className="flex w-full justify-end mb-5 mt-1">
                <div className="px-2">
                    <button


                        onClick={props.handleClick}
                    >{props.label}</button>
                </div>
            </div>
        </StyledForm >

    )

}

export default SubmitButtons;