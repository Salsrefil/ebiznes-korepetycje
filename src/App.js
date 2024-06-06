//import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Jobs from './components/Jobs';
import SaveJobs from './components/SaveJobs';
import Login from './components/Login';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/saved-job" element={<SaveJobs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
