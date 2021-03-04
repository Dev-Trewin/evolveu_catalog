import React from 'react';
import StyledForm from './StyledForm';

const DropdownList = (props) => {

    let renderedList = []
    if (props.list) {
        renderedList = props.list.map((item, index) => {
            return (
                <option
                    value={item}
                    key={item + index}

                >
                    {item}</option>
            )
        })
    }


    return (
        <StyledForm>
            <div className="flex-wrap mb-6" >
                <div className="">
                    <label className="">{props.label}</label>

                    <select
                        id={props.id ? props.id : 0}
                        onChange={props.handleSelectedItem}
                    >
                        {renderedList}
                    </select>
                </div>
            </div>
        </StyledForm>

    )
}

export default DropdownList;