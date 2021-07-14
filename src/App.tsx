import './App.css';
import '@ionic/react/css/core.css';
import { IonContent, IonList} from '@ionic/react';
import TaskList from './Components/TaskList';

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

export default App;
