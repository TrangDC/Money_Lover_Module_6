
import './App.css';
import LoginPage from "./components/LoginPage/LoginPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import HeaderPage from "./components/TransactionsPage/HeaderPage";
import InformationUser from "./components/UserPage/InformationUser";
import ManagerUserPage from "./components/UserPage/ManagerUserPage";
import WalletPage from "./components/UserPage/WalletPage";
import CategoriesPage from "./components/UserPage/CategoriesPage";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/user' element={<InformationUser />}></Route>
                <Route path='/user/manager' element={<ManagerUserPage />}></Route>
                <Route path='/user/categories' element={<CategoriesPage />}></Route>
                <Route path='/user/wallet' element={<WalletPage />}></Route>
                <Route path='/trans' element={<HeaderPage />}></Route>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path='/register' element={<RegisterPage />}></Route>
            </Routes>
        </BrowserRouter>


    </div>
  );
}

export default App;
