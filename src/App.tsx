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




class TaskList extends React.Component<{}, {Tasks: Array<string>, checklist: Array<boolean> ,messageText: string}> { // TODO: Change Tasks to an Array<String> from number. pass the array down so that the child can change it.
  /**
   * A class created to hold a list of tasks. Also contains an Add and Remove button
   */
  constructor(props: any){
    super(props);
    let taskList: Array<string>;
    let checkList: Array<boolean>;
    if(localStorage.getItem("taskList") == null){
      taskList = [];
      localStorage.setItem("taskList", JSON.stringify(taskList));
    }
    else{
      taskList = JSON.parse(localStorage.getItem("taskList")!);
    }
    if(localStorage.getItem("checkList") == null){
      checkList = [];
      localStorage.setItem("checkList", JSON.stringify(checkList));
    }
    else{
      checkList = JSON.parse(localStorage.getItem("checkList")!);
    }
    this.state = {
      Tasks: taskList,
      checklist: checkList,
      messageText : ""
    };
  }

  render(){
    const tasklist: Array<React.ReactNode> = [];
    for(var i = 0; i < this.state.Tasks.length; i++){
      tasklist.push(
        <Task tasks = {this.state.Tasks} checkList={this.state.checklist} index = {i} onUpdate = {() => this.onDelete()}/>
      )
    }
    return(
      <b>
        <IonItem color="secondary">
          <IonButton slot="start" onClick={() => this.onAdd()}>Add</IonButton>
          <IonButton slot="start" onClick={() => this.onRemove()}>Remove</IonButton>
          <IonInput placeholder="Enter text here." value={this.state.messageText} slot="start"
                    onIonChange={e => this.setText(e.detail.value!)}/>
        </IonItem>
        {tasklist}
      </b>
    );
  }
  
  // Class methods:

  private onAdd(){
    this.state.Tasks.push(this.state.messageText);
    this.state.checklist.push(false);
    this.setState({});
    localStorage.setItem("taskList", JSON.stringify(this.state.Tasks));
  }

  private onRemove(){
    if(this.state.Tasks.length > 1){
      this.state.Tasks.pop();
      this.state.checklist.pop();
      this.setState({});
      localStorage.setItem("taskList", JSON.stringify(this.state.Tasks));
    }
  }

  private onDelete(){
    this.setState({});
  }
  
  private setText(text: string){
    this.setState({messageText: text});
  }
}




class Task extends React.Component<{tasks: Array<string>, checkList: Array<boolean>, index: number, onUpdate: any}, {}> {

  inEditMode: boolean = false;
  
  constructor(props: any){
    super(props);
  }

  render(){
    if(!this.inEditMode){
      return(
        <IonItem>
          <IonCheckbox slot="start" checked={this.props.checkList[this.props.index]} onClick={() => this.onCheck()}/>
          <IonLabel slot="start">{this.props.tasks[this.props.index]}</IonLabel>
          <IonButton slot="end" onClick={() => this.onDelete()}>Delete</IonButton>
          <IonButton slot="end" onClick={() => this.onEdit()}>Edit</IonButton>
        </IonItem>
      )
    }
    else{
      return(
        <IonItem>
          <IonInput placeholder="Enter text here." value={this.props.tasks[this.props.index]} slot="start"
          onIonChange={e => this.editText(e.detail.value!)}/>
          <IonButton slot="end" onClick={() => this.onDone()}>Done</IonButton>
        </IonItem>
      )
    }
  }

  // Class methods: 

  onDelete(){
    this.props.tasks.splice(this.props.index, 1);
    this.props.checkList.splice(this.props.index, 1);
    this.props.onUpdate();
    localStorage.setItem("taskList", JSON.stringify(this.props.tasks));
  }

  onEdit(){
    //this.props.tasks[this.props.index] = "Edited!";
    this.inEditMode = !this.inEditMode;
    this.props.onUpdate();
  }

  editText(text: string){
    this.props.tasks[this.props.index] = text;
  }

  onDone(){
    this.inEditMode = !this.inEditMode;
    this.props.onUpdate();
    localStorage.setItem("taskList", JSON.stringify(this.props.tasks));
  }

  onCheck(){
    this.props.checkList[this.props.index] = !this.props.checkList[this.props.index];
    this.props.onUpdate();
    localStorage.setItem("checkList", JSON.stringify(this.props.checkList));
  }
}

export default App;
