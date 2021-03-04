import React from 'react';
// import StyledForm from './StyledForm'

const AutocompleteList = ({ suggestions, indexSuggestion, handleClickAutocomplete }) => {


    const renderedList = suggestions.map((suggestion, index) => {
        if (index === indexSuggestion) {
            return (<li
                onClick={handleClickAutocomplete}
                className="font-900"
                key={suggestion}
            >{suggestion}</li>)
        } else {
            return (<li
                onClick={handleClickAutocomplete}
                key={suggestion}
            >{suggestion}</li>)
        }
    })

    if (renderedList.length) {
        return (
            // <StyledForm>
            <React.Fragment>
                <ul>
                    {renderedList}
                </ul>

            </React.Fragment>
            // </StyledForm>

        )
    } else {
        return <div></div>
    }

}

export default AutocompleteList;