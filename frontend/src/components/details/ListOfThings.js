import React from "react";
import './details.css'

function ListOfThings(props) {
  // console.log("props.list: ", props);
  let renderedList = [];
  if (props.list) {
    renderedList = props.list.map((item, index) => {
      return (
        <div className="ui two column centered middle aligned grid "
          key={'listofthing'.concat(index)}
        >

          <span className="">{item}</span>
        </div>
      );
    });
  }

  if (renderedList.length) {
    return (
      <>
        <div>
          <div id="container-thing" >
            <h3 className="ui centered aligned icon header ">{props.label}</h3>
          </div>
          <div id="container-list" className="ui text container ">
            <div className="ui equal width grid ">{renderedList}</div>
          </div>
        </div>
      </>

    );
  } else {
    return <div></div>;
  }
}
export default ListOfThings;
