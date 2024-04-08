import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import WelcomePage from "./modules/WelcomePage";
import Authorization from "./modules/Authorization";
import ProtectedRoutes from "./common/util/routers/ProtectedRoutes";
import AuthorizedUser from "./modules/AuthorizedUser/AuthorizedUser";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to={"welcome"}/>} />
        <Route path="/welcome" element={<WelcomePage/>} />
        <Route path="/auth/*" element={<Authorization/>} />
        <Route element={<ProtectedRoutes errorMessage="Авторизируйтесь снова" permissions={['director', 'employee']}/>}>
            <Route path="/account/*" element={<AuthorizedUser/>}/>
        </Route>
      </Routes>
  );
}

export default App;
