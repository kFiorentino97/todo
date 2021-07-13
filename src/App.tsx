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
            <Task value = "Task #1"/>
            <Task value = "Task #2"/>
            <Task value = "Task #3"/>
            <Task value = "Task #4"/>
            <Task value = "Task #5"/>
          </IonList>
            <IonButton>Add</IonButton>
            <IonButton>Remove</IonButton>
        </IonContent>
      </header>
    </div>
  );
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

function onDelete(props: any){
  alert("Deleted!");
}

function onEdit(props: any){
  alert("Edited!");
}

function onCheck(props: any){

}

export default App;
