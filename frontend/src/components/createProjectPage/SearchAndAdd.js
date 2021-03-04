import React, { useState, useEffect } from 'react';
import '../../styles/SearchAndAdd.css';
import StyledForm from './StyledForm';
import AutocompleteList from './AutocompleteList';
import ListOfChoices from './ListOfChoices'


const SearchAndAdd = (props) => {
    const [toAddToTheList, setToAddToTheList] = useState([]);
    const [indexSuggestion, setIndexSuggestion] = useState(0)
    const [suggestions, setSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        props.handleChangeList(toAddToTheList)
    }, [props, toAddToTheList])

    const searching = (myInput, myDataList) => {
        if (myDataList) {
            const result = [];
            myDataList.forEach((element) => {
                const elementPresent = element.toLowerCase().startsWith(myInput.toLowerCase())
                if (elementPresent) {
                    result.push(element);
                }
            })
            if (myInput === "") {
                setSuggestions([])
                setIndexSuggestion(0)
            } else {
                setSuggestions(result)
            }
        }
    }

    const onChangeInput = (event) => {
        event.preventDefault()
        setInputValue(event.target.value)
        // console.log('onChangeInput: ', event.target.value)
        searching(event.target.value, props.listOfItems)
    }
    const isUniqueItemInArray = (item, array) => {

        let same = []
        array.forEach(itemOfArray => {
            if (itemOfArray === item) {
                same.push(item)
            }
        })
        if (!same.length) {
            return true
        }
        return false
    }
    const onKeyUp = (event) => {
        event.preventDefault();
        const key = event.keyCode;
        const arrowUp = 38;
        const arrowDown = 40;
        const enterKey = 13;

        if (suggestions.length !== 0) {
            switch (key) {
                case arrowUp:
                    if (indexSuggestion > 0) {
                        setIndexSuggestion(indexSuggestion - 1)
                    }
                    break;
                case arrowDown:
                    if (indexSuggestion < suggestions.length - 1)
                        setIndexSuggestion(indexSuggestion + 1)
                    break;
                case enterKey:
                    if (suggestions.length !== 0) {
                        if (isUniqueItemInArray(suggestions[indexSuggestion], toAddToTheList)) {
                            setToAddToTheList(oldArray => [...oldArray, suggestions[indexSuggestion]])
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }
    const resetSuggestions = () => {
        setSuggestions([])
        setIndexSuggestion(0)
    }
    const handleClickAutocomplete = (e) => {
        console.log(e.target.value)
    }
    const handleClickList = (e) => {
        let list = toAddToTheList.slice();
        list.splice(list.indexOf(e.target.textContent), 1);
        setToAddToTheList(list)
    }

    return (
        <StyledForm>
            <div id="section-bottom" className="mt-3 mt-6">

                <div id="section-tools" className="flex-nowrap w-full mb-6">
                    <div className="">
                        <label
                            htmlFor="input-search"
                        >
                            Add {props.label}:</label>
                    </div>
                    <div className="">
                        <input
                            id='input-search'
                            type='input'
                            placeholder="Search"
                            autoComplete="off"
                            onChange={onChangeInput}
                            onKeyUp={onKeyUp}
                            value={inputValue}
                            onBlur={resetSuggestions}
                        />

                        <div
                            className="autocomplete-box rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                        >
                            <AutocompleteList
                                indexSuggestion={indexSuggestion}
                                suggestions={suggestions}
                                handleClickAutocomplete={handleClickAutocomplete}

                            />
                        </div>
                    </div>

                </div>

                <div className="flex mb-6">
                    <div className="w-full">
                        <label
                            htmlFor="title"
                        >
                            {props.label}:</label>
                    </div>
                    <div className="w-full">
                        <div
                            className="autocomplete-box  bg-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
                        >
                            <ListOfChoices
                                itemsList={toAddToTheList}
                                handleClickList={handleClickList}
                            />

                        </div>
                    </div>
                </div>
            </div >
        </StyledForm>

    )

};

export default SearchAndAdd;


