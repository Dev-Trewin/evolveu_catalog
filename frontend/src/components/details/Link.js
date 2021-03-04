import React from 'react'

// What does this function do?  What is props.accounts from?
export default function Link(props) {
  let renderedList = []
  console.log()
  if (props.accounts) {

    renderedList = props.accounts.map((account, index) => {
      return (
        <tbody key={index}>
          <tr>
            <td data-label="Names">{account.name}</td>
            <td data-label="Github">{account.github}</td>
            <td data-label="LinkedIn">{account.linked}</td>
          </tr>
        </tbody >
      );
    })
  }
  if (renderedList.length) {
    return (
      <div className="ui container">
        <table className="ui celled table">
          <thead>
            <tr>
              <th>Names</th>
              <th>Github</th>
              <th>Linked In</th>
            </tr>
          </thead>
          {renderedList}
        </table>
      </div>
    );
  } else {
    return <div></div>
  }

}


