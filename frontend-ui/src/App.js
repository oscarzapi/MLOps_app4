import './App.css';
import Navigator from './components/Navigator';
import Home from './components/Home';
import UploadFile from './components/UploadFile';

function App() {
  return (
    <div className="App">
      <Navigator></Navigator>
      <Home></Home>
      <UploadFile></UploadFile>
    </div>
  );
}

export default App;
