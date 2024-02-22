
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./new_src/components/shared/Layout";
import Main from "./components/HomePage/Main/Main";
import ManagerUserPage from "./components/UserPage/ManagerUserPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./new_src/Dashboard";

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Dashboard />}/>
                    <Route path="/products" element={<Main />}/>
                </Route>


                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
