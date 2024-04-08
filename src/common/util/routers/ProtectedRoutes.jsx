import {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import axios from "axios";

const ProtectedRoutes = ({
                             errorMessage,
                             permissions
                         }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!localStorage.getItem('Authorization'));

    useEffect( () => {

        async function validateUser () {
            let userInfo;
            try {
                userInfo = (await axios.get('/auth/valid')).data;
            } catch (message) {
                alert(errorMessage);
                setIsUserAuthenticated(false);
                return;
            }

            if (permissions.length === 0) {
                return
            }

            if (userInfo) {
                const validPermission = permissions.filter((permission) => userInfo.authorities.includes(permission));
                validPermission.length > 0 ? setIsUserAuthenticated(true) : setIsUserAuthenticated(false);
            }
        }


        const token = localStorage.getItem('Authorization');

        if (token) {
            validateUser();
        }

        return () => {
            axios.interceptors.response.eject(interceptorResponse);
        }
    }, []);

    const interceptorResponse = axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401) {
                setIsUserAuthenticated(false);
                alert(errorMessage);
            }
            return Promise.reject(error);
        }
    )

    return (
        isUserAuthenticated ? <Outlet/> : <Navigate to="/auth/sign-in"/>
    );
}

export default ProtectedRoutes;