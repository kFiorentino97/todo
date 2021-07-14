import React from 'react';
import '../App.css';
import '@ionic/react/css/core.css';
import { IonButton, IonLabel, IonInput, IonCheckbox, IonItem} from '@ionic/react';

        
class Task extends React.Component<{tasks: Array<string>, checkList: Array<boolean>, index: number, onUpdate: any}, {}> {
  /**
   * @param tasks: List of strings that contain the tasks in the tasklist.
   * @param checkList: List of booleans that contain the checkmarks in the tasklist.
   * @param index: Position in list of this Task.
   * @param onUpdate: Function to be called when TaskList needs to be updated.
   */

  inEditMode: boolean = false;
  constructor(props: any){
    super(props);
  }

  render(){
    /**
     * Renders task differently depending on the task is currently being edited or not.
     */
    if(!this.inEditMode){
      return this.renderEditMode();
    }
    else{
      return this.renderNormalMode();
    }
  }

  // Class methods: 

  private onDelete(){
    this.props.tasks.splice(this.props.index, 1);
    this.props.checkList.splice(this.props.index, 1);
    this.props.onUpdate();
    localStorage.setItem("taskList", JSON.stringify(this.props.tasks));
  }

  private onEdit(){
    /**
     * Changes the display of the element to be edited.
     */
    this.inEditMode = !this.inEditMode;
    this.props.onUpdate();
  }

  private editText(text: string){
    /**
     * Updates the text while it's being written.
     */
    this.props.tasks[this.props.index] = text;
  }

  private onDone(){
    /**
     * Turns off edit mode and updates localStorage after user clicks done button.
     */
    this.inEditMode = !this.inEditMode;
    this.props.onUpdate();
    localStorage.setItem("taskList", JSON.stringify(this.props.tasks));
  }

  private onCheck(){
    /**
     * Code for when user clicks check button.
     */
    this.props.checkList[this.props.index] = !this.props.checkList[this.props.index];
    this.props.onUpdate();
    localStorage.setItem("checkList", JSON.stringify(this.props.checkList));
  }
  
  private renderEditMode(){
    /**
     * How the task item is displayed while in edit mode.
     */
    return(
      <IonItem>
        <IonCheckbox slot="start" checked={this.props.checkList[this.props.index]} onClick={() => this.onCheck()}/>
        <IonLabel slot="start">{this.props.tasks[this.props.index]}</IonLabel>
        <IonButton slot="end" onClick={() => this.onDelete()}>Delete</IonButton>
        <IonButton slot="end" onClick={() => this.onEdit()}>Edit</IonButton>
      </IonItem>
    )
  }

  private renderNormalMode(){
    /**
     * How the task item is displayed while it isn't in edit mode.
     */
    return(
      <IonItem>
        <IonInput placeholder="Enter text here." value={this.props.tasks[this.props.index]} slot="start"
        onIonChange={e => this.editText(e.detail.value!)}/>
        <IonButton slot="end" onClick={() => this.onDone()}>Done</IonButton>
      </IonItem>
    )
  }
}

export default Task