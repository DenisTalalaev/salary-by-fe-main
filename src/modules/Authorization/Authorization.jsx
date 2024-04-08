import {Route, Routes} from "react-router-dom";
import Registration from "./Registration";
import SignIn from "./SignIn";
import Connecting from "./Connecting";

const Authorization = () => {

    return (
        <Routes>
            <Route path="sign-in" element={<SignIn/>}/>
            <Route path="sign-up" element={<Registration/>}/>
            <Route path="connecting" element={<Connecting/>}/>
        </Routes>
    )
}

export default Authorization;