import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import LoginPage from "./components/LoginPage/LoginPage";
import WalletPage from "./components/UserPage/wallet/WalletPage";
import InformationUser from "./components/UserPage/InformationUser";
import Dashboard from "./components/HomePage/Dashboard"
import Layout from "./layout/Layout";


function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route path="/home" element={<Dashboard />}/>
                    <Route path="/wallets" element={<WalletPage />}/>
                    <Route path="/profile" element={<InformationUser />}/>
                </Route>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
