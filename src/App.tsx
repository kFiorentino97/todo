import React from 'react';
import * as ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import '@ionic/react/css/core.css';
import { IonButton, IonDatetime, IonContent, IonLabel, IonInput, IonToggle, IonRadio, IonCheckbox, 
         IonItemSliding, IonItemOption, IonItem, IonList, IonItemDivider} from '@ionic/react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <IonContent
        color="primary">
          <IonList
          color="secondary">
            <TaskList/>
          </IonList>
        </IonContent>
      </header>
    </div>
  );
}


class TaskList extends React.Component<{}, {Tasks: number, messageText: String}> { // TODO: Change Tasks to an Array<String> from number. pass the array down so that the child can change it.
  /**
   * A class created to hold a list of tasks. Also contains an Add and Remove button
   */
  constructor(props: any){
    super(props);
    this.state = {
      Tasks : 5,
      messageText : "String"
    };
  }

  private onAdd(){
    this.setState({Tasks: this.state.Tasks + 1});
  }

  private onRemove(){
    if(this.state.Tasks > 1){
      this.setState({Tasks: this.state.Tasks - 1});
    }
  }

  render(){
    /**
     * This will loop and create a list of tasks the size of this.state.Tasks and will include an Add and Remove button at the bottom of the list.
     */
    const tasklist: Array<React.ReactNode> = [];
    for(var i = 0; i < this.state.Tasks; i++){
      tasklist.push(
        <Task tasks = {i + 1}/>
      )
    }
    return(
      <b>
        {tasklist}
        <IonItem color="secondary">
          <IonButton onClick={() => this.onAdd()}>Add</IonButton>
          <IonButton onClick={() => this.onRemove()}>Remove</IonButton>
          <IonInput placeholder="Enter text here." slot="end"/>
        </IonItem>
      </b>
    );
  }
}

class Task extends React.Component<{tasks: number}, {value: String}> {
  constructor(props: any){
    super(props);
    this.state = {
      value : "",
    };
  }

  render(){
    return(
      <IonItem>
        <IonCheckbox slot="start" />
        <IonLabel slot="start">{"Task #" + this.props.tasks}</IonLabel>
        <IonButton slot="end" onClick={() => this.onDelete()}>Delete</IonButton>
        <IonButton slot="end" onClick={() => this.onEdit()}>Edit</IonButton>
      </IonItem>
    )
  }

  onDelete(){
    alert("Deleted!");
  }

  onEdit(){
    this.setState({value: "edited"});
  }

}


function onDelete(props: any){
  alert("Deleted!");
}

function onEdit(props: any){
  props.value = "edited";
}

function onCheck(props: any){

}

export default App;
