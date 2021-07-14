
import React from 'react';
import '../App.css';
import '@ionic/react/css/core.css';
import { IonButton, IonItem, IonInput} from '@ionic/react';
import Task from './Task';

class TaskList extends React.Component<{}, {Tasks: Array<string>, checklist: Array<boolean>, messageText: string}> { 
  /**
   * @description: A component that holds all of the tasks, keeps track of each one and renders the list. Also has functionality to add items and clear the list.
   * @param Tasks: An array of strings that populate the todolist.
   * @param checklist: An array of booleans that keep track of which items are check.
   * @param messageText: A string holding the value currently in the input box.
   */

  constructor(props: any){
    super(props);
    this.state = {
      Tasks: this.getTaskList(),
      checklist: this.getCheckList(),
      messageText : ""
    };
  }

  render(){
    /**
     * Renders the tasklist as well as the Add and Clear buttons.
     */
    const tasklist: Array<React.ReactNode> = this.populateTasks();
    return(
      <b>
        <IonItem color="secondary">
          <IonButton slot="start" onClick={() => this.onAdd()}>Add</IonButton>
          <IonButton slot="start" onClick={() => this.onClear()}>Clear</IonButton>
          <IonInput placeholder="Enter text here." value={this.state.messageText} slot="start"
                    onIonChange={e => this.setText(e.detail.value!)}/>
        </IonItem>
        {tasklist}
      </b>
    );
  }
  
  // Class methods:

  private onAdd(){
    /**
     * Updates the tasklist with a new task which gets the string from Tasks and updates the checklist.
     */
    this.state.Tasks.push(this.state.messageText);
    this.state.checklist.push(false);
    this.setState({});
    localStorage.setItem("taskList", JSON.stringify(this.state.Tasks));
  }

  private onClear(){
    /**
     * Empties both arrays and updates local storage.
     */
    this.state.Tasks.length = 0;
    this.state.checklist.length = 0;
    this.setState({});
    localStorage.setItem("taskList", JSON.stringify(this.state.Tasks));
    localStorage.setItem("checkList", JSON.stringify(this.state.checklist));
  }

  private onUpdate(){
    /**
     * A function to be sent to children when the tasklist needs to be rerendered.
     */
    this.setState({});
  }
  
  private setText(text: string){
    /**
     * A function that's called every time the text in ion-input is updated.
     */
    this.setState({messageText: text});
  }
  
  private getCheckList(){
    /**
     * Checks local storage to see if there is a checkList. If not it creates an empty one and stores it. If it does find it, it loads the data from it.
     */
    let checkList: Array<boolean>;
    if(localStorage.getItem("checkList") == null){
      checkList = [];
      localStorage.setItem("checkList", JSON.stringify(checkList));
    }
    else{
      checkList = JSON.parse(localStorage.getItem("checkList")!);
    }
    return checkList;
  }

  private getTaskList(){
    /**
     * Checks local storage to see if there is a taskList. If not it creates an empty one and stores it. If it does find it, it loads the data from it.
     */
    let taskList: Array<string>;
    if(localStorage.getItem("taskList") == null){
      taskList = [];
      localStorage.setItem("taskList", JSON.stringify(taskList));
    }
    else{
      taskList = JSON.parse(localStorage.getItem("taskList")!);
    }
    return taskList;
  }
  
  private populateTasks(){
    /**
     * Creates a array of ReactNodes that hold the list of tasks so that it can be rendered on the webpage.
     */
    let tasklist: Array<React.ReactNode> = [];
    for(var i = 0; i < this.state.Tasks.length; i++){
      tasklist.push(
        <Task tasks = {this.state.Tasks} checkList={this.state.checklist} index = {i} onUpdate = {() => this.onUpdate()}/>
      )
    }
    return tasklist;
  }
}

export default TaskList;