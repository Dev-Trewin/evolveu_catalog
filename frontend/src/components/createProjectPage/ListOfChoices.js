import React from 'react';

const ListOfChoices = ({ itemsList, handleItemsList, handleClickList }) => {

    const bgWhite = "list-disc"//class name

    const renderedList = itemsList.map((item, index) => {

        return (<li
            id={item.concat(index)}
            key={item.concat(index)}
            onClick={handleClickList}
            className={bgWhite}
        >{item}</li>)


    })
    if (renderedList.length) {         // No need for a comparison?
        return (
            <React.Fragment>
                <ul>
                    {renderedList}
                </ul>

            </React.Fragment>

        )
    } else {
        return <div></div>
    }


}

export default ListOfChoices;