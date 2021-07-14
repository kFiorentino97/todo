import React from 'react';
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
            <TaskList key="taskList"></TaskList>
          </IonList>
          <AddRemove/>
        </IonContent>
      </header>
    </div>
  );
}

class TaskList extends React.Component {
  Tasks: number = 5;
  constructor(props: any){
    super(props);
  }
  render(){
    const tasklist: Array<React.ReactNode> = [];
    for(var i = 0; i < this.Tasks; i++){
      tasklist.push(
        <Task value={"Task #" + (i + 1)}/>
      )
    }
    return(
      tasklist
    );
  }
}

function Task(props: any){
  return(
    <IonItem>
      <IonCheckbox slot="start" />
      <IonLabel slot="start">{props.value}</IonLabel>
      <IonButton slot="end" onClick={() => onDelete(props)}>Delete</IonButton>
      <IonButton slot="end" onClick={() => onEdit(props)}>Edit</IonButton>
    </IonItem>
  )
}

function AddRemove(props: any){
  return(
    <b>
    <IonButton onClick={() => onAdd(props)}>Add</IonButton>
    <IonButton onClick={() => onRemove(props)}>Remove</IonButton>
    </b>
  )
}

function onDelete(props: any){
  alert("Deleted!");
}

function onEdit(props: any){
  alert("Edited!");
}

function onCheck(props: any){

}

function onAdd(props: any){
  props.swag.Tasks++;
}

function onRemove(props: any){
  props.swag.Tasks--;
}
export default App;
