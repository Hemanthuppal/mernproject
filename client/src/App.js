import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Form from './Components/Form';
import Display from './Components/Display';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/display" element={<Display/>} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
