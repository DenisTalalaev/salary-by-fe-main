import {Route, Routes} from "react-router-dom";

import {useEffect} from "react";

const AuthorizedUser = () => {

    useEffect(() => {

    }, []);

    return (
        <Routes>
            <Route path="/employee/*" element={<div>Employee</div>}/>
            <Route path="/director/*" element={<div>Director</div>}/>
        </Routes>
    )
}

export default AuthorizedUser;