import React from 'react';

class SelectedNumbers extends React.Component{
    render(){
        const {num, key, isLocked, onUnlockClick, onLockClick} = this.props
        return(
            <li key = {key} className = 'list-group-item'>
                {num}
             <button className = 'btn btn-success' onClick = {isLocked ? onUnlockClick : onLockClick}>
                 {isLocked ? 'Unlock' : 'Lock'}
             </button>
                    
            </li>
        );
    }
}
export default SelectedNumbers;