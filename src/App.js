
import './App.css';
import LoginPage from "./components/LoginPage/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import InformationUser from "./components/UserPage/InformationUser";
import ManagerUserPage from "./components/UserPage/ManagerUserPage";
import WalletPage from "./components/UserPage/WalletPage";
import Home from "./components/HomePage/Home";

function App() {
  return (
    <div className="App">

        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>

        {/*<BrowserRouter>*/}
        {/*    <Routes>*/}
        {/*        <Route path='/user' element={<InformationUser />}></Route>*/}
        {/*        <Route path='/user/manager' element={<ManagerUserPage />}></Route>*/}
        {/*        <Route path='/user/wallet' element={<WalletPage />}></Route>*/}
        {/*        <Route path='/login' element={<LoginPage />}></Route>*/}
        {/*        <Route path='/register' element={<RegisterPage />}></Route>*/}
        {/*        <Route path='/' element={<Dashboard />}></Route>*/}
        {/*    </Routes>*/}
        {/*</BrowserRouter>*/}

    </div>
  );
}

export default App;
