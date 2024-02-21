
import './App.css';
import LoginPage from "./components/LoginPage/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import HeaderPage from "./layout/HeaderPage";

import Menu from "./layout/Menu";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HeaderPage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/register' element={<RegisterPage />}></Route>
                <Route path='/menu' element={<Menu />}></Route>
            </Routes>
        </BrowserRouter>


    </div>
  );
}

export default App;
