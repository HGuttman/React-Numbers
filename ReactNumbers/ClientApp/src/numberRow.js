  
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';

class NumberRow extends React.Component{
    render(){
        const {num, isSelected, removeSelectClick, onSelectClick, isLocked} = this.props;
        return(
            <tr>
                <td>{num}</td>
                <td>
                  {isLocked?
                  (<button className = {`btn btn-${isSelected ? 'danger':'primary'}`}
                  disabled 
                  onClick = {isSelected ? removeSelectClick: onSelectClick}>
                      {isSelected? 'Remove from Selected' : 'Add to Selected'}
                      </button>) :
                      (<button className={`btn btn-${isSelected ? 'danger' : 'primary'}`}
                      onClick={isSelected ? removeSelectClick : onSelectClick}>
                      {isSelected ? 'Remove from Selected' : 'Add to Selected'}
                  </button>) }
                </td>
            </tr>
        );
    }
};
export default NumberRow;