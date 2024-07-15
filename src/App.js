import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navigate from "./Navigate/Navigate";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Router>
        <Navigate />
        <ToastContainer />
       </Router>
    
    </div>
  );
}

export default App;
