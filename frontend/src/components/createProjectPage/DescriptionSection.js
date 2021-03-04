import React, { useEffect } from 'react'
import StyledForm from './StyledForm';

function DescriptionSection(props) {
    useEffect(() => {
        validateDescription()

    }, [])
    const validateDescription = () => {
        const description = document.querySelector('#description')
        if (description && description.value.length > 30) return true;
        return false;
    }
    return (
        <div>
            <StyledForm>
                <div className="flex-wrap inline-flex mb-6 mt-6" >
                    <div className="">
                        <label
                            htmlFor="description"
                        >Project Description:</label>
                    </div>
                    <div className="">
                        {validateDescription() ? "" : <span className="text-red-400">required *</span>}
                    </div>
                    <div className="w-full">
                        <textarea
                            id='description'
                            rows="8"
                            resize="vertical"
                            onChange={props.handleChangeDescription}
                            value={props.description}
                        />

                    </div>
                </div>
            </StyledForm>

        </div>
    )
}

export default DescriptionSection
