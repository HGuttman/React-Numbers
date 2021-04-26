import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import NumberRow from './numberRow';
import SelectedNumbers from './selectedNumbers';
import {produce} from 'immer';

class NumbersTable extends React.Component{

    state = {
        numbers:[],
        selectedNumbers: [],
        lockedNumbers: []
    }

    generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    onAddClick = ()=>{
        const num = (this.generateRandomNumber(1,1000));
        const nextState = produce(this.state, draftState =>{
            draftState.numbers.push(num);
        });
        this.setState(nextState);
    }
        
        isSelected = (num)=>{
            const selected = this.state.selectedNumbers.find(n => n === num);
            return !!selected;
        }

        onSelectClick = num => {
            const nextState = produce(this.state, draftState =>{
                draftState.selectedNumbers.push(num)
            });
            this.setState(nextState);
        }
        removeSelectClick = num =>{
            const selected = this.state.selectedNumbers.filter(n => n !== num)
            const nextState = produce(this.state, draftState =>{
                draftState.selectedNumbers = selected
            });
            this.setState(nextState);
        }
        showSelectedNumbers = () =>{
            return(<div className = 'row jumbotron'>
                <div className = 'col-md-6 col-md-offset 3'>
                    <h3>Selected Numbers</h3>
                    <ul className = 'list-group'>
                        {this.state.selectedNumbers.map((num, i)=>{
                            return(<SelectedNumbers
                                num = {num}
                                key = {i}
                                onLockClick = {()=> this.onLockClick(num)}
                                onUnlockClick = {()=> this.onUnlockClick(num)}
                                isLocked = {this.isLocked(num)}
                                    />)
                        })}
                    </ul>
                </div>
            </div>)
        }
        onLockClick = (num)=>{
            const nextState = produce(this.state, draftState =>{
                draftState.lockedNumbers.push(num);
            });
            this.setState(nextState);
        }
        onUnlockClick = (num)=>{
            const locked = this.state.lockedNumbers.filter(n=> n!== num)
            const nextState = produce(this.state, draftState=>{
                draftState.lockedNumbers= locked
            });
            this.setState(nextState);
        }
        isLocked = num =>{
             const locked = this.state.lockedNumbers.find(n => n === num);
             return !!locked;   
        }

    render(){
        return(
            <div className = 'container'>
                <button className ='btn btn-primary' onClick = {this.onAddClick}>Add Number</button>
                <table className = 'table table-hover table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Add/Remove From Selected</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.numbers.map((num, i) =>{
                            return <NumberRow
                            key={i}
                            num= {num}
                            isSelected= {this.isSelected(num)}
                            onSelectClick = {()=>this.onSelectClick(num)}
                            removeSelectClick = {()=> this.removeSelectClick(num)}
                            isLocked = {this.isLocked(num)}
                            />
                        })}
                    </tbody>
                </table>
                {!!this.state.selectedNumbers.length && this.showSelectedNumbers()}
            </div>
        )
    }
}
export default NumbersTable;