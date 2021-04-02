import React from 'react';

function OptionList (props){

    return (<React.Fragment>{
        
        (props.showOption && props.filteredOptions.length > 0) ? 
            <ul className="options">
            {props.filteredOptions.map((item, index) => {
              return (
                <li key={index}
                  onClick = {props.selectOption}
                >
                  {item.Title}
                </li>
              );
            })
            }
          </ul>
         : 
         ( props.userInput.length > 3 ? <div className="no-options">
         <em>No Movie Found!</em>
        </div> : null) }

    </React.Fragment>)
}

export default OptionList;
