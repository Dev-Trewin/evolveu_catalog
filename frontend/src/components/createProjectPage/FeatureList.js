import React, { useState, useEffect } from 'react';
import StyledForm from './StyledForm';
import ListOfChoices from './ListOfChoices';

const FeatureList = (props) => {
    const [inputValue, setInputValue] = useState('');
    const [listOfFeature, setListOfFeature] = useState([]);

    useEffect(() => {
        props.listOfFeature(listOfFeature)
    }, [listOfFeature, props])

    const handleOnKeyUp = (e) => {
        e.preventDefault();
        const enterKey = 13;
        if (e.keyCode === enterKey && inputValue.length >= 3) {
            let newList = listOfFeature.slice()
            newList.push(e.target.value)
            setListOfFeature(newList)
            setInputValue('')
        }

    }
    const handleClickList = (e) => {
        console.log(e.target.textContent)
        let newList = listOfFeature.slice();
        newList.splice(newList.indexOf(e.target.textContent), 1)
        setListOfFeature(newList)
    }
    return (

        <StyledForm>
            <div className="flex-wrap inline-flex mb-6 w-full" >
                <div className="">
                    <label
                        htmlFor="title"
                    >{props.label}</label>
                </div>
                <div className="w-full mb-4">
                    <div className="">
                        <div className="">
                            <input
                                id={props.id}
                                type='text'
                                onChange={e => setInputValue(e.target.value)}
                                value={inputValue}
                                onKeyUp={handleOnKeyUp}
                                autoComplete="off"
                            />
                        </div>
                    </div>

                </div>
                <div className="w-full flex justify-center">
                    <div
                        className="autocomplete-box  appearance-none border-2 border-gray-200 rounded w-4/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                    >
                        <ListOfChoices
                            itemsList={listOfFeature}
                            handleClickList={handleClickList}
                        />
                    </div>
                </div>
            </div>
        </StyledForm>


    )
}

export default FeatureList;
